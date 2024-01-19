import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import * as L from "leaflet";
import * as R from "leaflet-responsive-popup";
import { StateCodes } from 'src/app/core/config/StateCodes';
import { environment } from 'src/environments/environment';
import invert from 'invert-color';
import * as latLongConfig from './../../../../../assets/data/config.json'
import { RbacService } from 'src/app/core/services/rbac-service.service';
import { ReportDrilldownService } from 'src/app/core/services/report-drilldown/report-drilldown.service';
import { MapService } from 'src/app/core/services/map/map.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnChanges {
  map: any;
  error = false;
  mapCenterLatlng: any;
  markers = new L.FeatureGroup();
  layerGroup = new L.LayerGroup();
  legend: any;
  countryGeoJSON: any;
  stateGeoJSON: any;
  noData = false;
  config = environment.config
  rbacDetails: any;
  hierarchyLevel: any;
  districtGeoJSON: any;
  legendForm: any;
  range1: any = true;
  drillDownDetails: any;

  @Input() mapData!: any;
  @Input() level: any;
  @Input() enableDrillDown: boolean = false;
  @Input() perCapitaReport: any = false;
  @Input() drillDown: boolean = false;
  @Input() drillDownLevel: any;
  // @Input() hierarchyLevel: any = this.config === 'NVSK' ? 0 : 1;

  @Output() drillDownFilter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  constructor(private _rbacService: RbacService,
    private readonly _drillDownService: ReportDrilldownService,
    private readonly _mapService: MapService
  ) {
    this.mapCenterLatlng = latLongConfig.default['IN'];
    this._rbacService.getRbacDetails().subscribe((rbacDetails: any) => {
      this.rbacDetails = rbacDetails
      this.hierarchyLevel = rbacDetails.role
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    this.markers.clearLayers();
    this.legend?.remove();
    // if (this.level === 'district') {
    //   // this.updateMap();
    //   this.initMap();
    // }
    // else {
    //   this.initMap();
    // }
    this.initMap();
  }

  async initMap(): Promise<any> {
    if (!this.mapContainer || !this.mapData) {
      return;
    }
    if (this.map) {
      this.map.remove();
    }
    let reportTypeBoolean = false;
    if (typeof this.mapData?.data[0]?.indicator === 'string') {
      reportTypeBoolean = true;
    }
    this.map = L.map(this.mapContainer.nativeElement, { zoomSnap: 0.05, minZoom: 4, zoomControl: true, scrollWheelZoom: false, touchZoom: false }).setView([this.mapCenterLatlng.lat, this.mapCenterLatlng.lng], this.mapCenterLatlng.zoomLevel);
    this.layerGroup.addTo(this.map);
    await this.applyIndiaBorder();
    try {
      let lev = this.drillDownLevel ? this.drillDownLevel : this.rbacDetails.role
      if (Number(lev) == 1) {
        // await this.applyCountryBorder(this.mapData);
        // this.applyDistrictBorder();
        await this.applyStateWithDistrictsBorder();
        this.createMarkers(this.mapData);
      }

      const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd'
      });

      tiles.addTo(this.map);
      this.map.attributionControl.setPrefix(false);
      // var imageUrl ='https://i.stack.imgur.com/khgzZ.png',
      // imageBounds = [[80.0, -350.0], [-40.0, 400.0]];
      // L.imageOverlay(imageUrl, imageBounds, {opacity: 0.3}).addTo(this.map);
      if (this.config === 'NVSK' && Number(lev) === 0) {
        this.map?.removeLayer(this.layerGroup);
        this.createMarkers(this.mapData);
      }
      else if (Number(lev) > 1 || this.hierarchyLevel > 1) {
        this.map?.removeLayer(this.layerGroup);
        await this.applyStateBorder();
        this.applyDistrictBorder();
        this.createMarkers(this.mapData);
      }
    } catch (e) {
      console.error(e);
      this.error = true;
    }
  }

  invalidateSize(): void {
    this.map.invalidateSize();
  }

  updateMap(): void {
    if (!this.map) {
      this.initMap();
      return;
    }

    this.markers.clearLayers();
    this.legend?.remove();
    if (this.hierarchyLevel < 3) {
      this.fitBoundsToCountryBorder();
    }
    this.createMarkers(this.mapData);
  }

  getLayerColor(e: any, legend?: boolean, values?: number[] ,program ?: string) {
    if (((this.config === 'NVSK' && this.hierarchyLevel === 0) && this.level === 'district' && !legend) || (this.hierarchyLevel > 1 || this.drillDownLevel > 1) && !legend) {
      return '#fff'
    }
    else if (values.length === 1) {
      return "#007000"
    }
    else {
      let value = e;
    //   let colors ; //Uncomment for circle on map
    //   if(program !== undefined && program!== null && program === 'microimprovement'){
    //     colors = ["#007000", "#4CBB17", "#0BDA51"];
    //   }else{
    //    colors = ["#007000", "#FFBF00", "#D2222D"];
    //  }
     let colors = ["#1D4586", "#1156CC", "#6D9FEB"];
      let color = "#fff";
      value = Number(value);
      for (let i = 0; i < values.length - 1; i++) {
        if (value <= values[i] && value >= values[i + 1]) {
          color = colors[i];
        }
      }

      return color;
    }
  }

  async applyCountryBorder(mapData: any, singleColor?: any): Promise<any> {
    let reportTypeIndicator = this.mapData?.options && this.mapData.options.reportIndicatorType ? this.mapData.options.reportIndicatorType : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value';
    let parent = this;
    return new Promise(async (resolve, reject) => {
      try {
        let data;
        if (this.config === 'NVSK' && this.rbacDetails.role === 0) {
          data = await this._mapService.getCountryGeoJSON();
        }
        else {
          data = await this._mapService.getStateGeoJSON();
        }

        let min!: number, max!: number, values: any[] = [];

        if (reportTypeIndicator === 'value') {
          mapData.data.forEach((data: any, index: number) => {
            if (index === 0) {
              min = data.indicator;
              max = data.indicator;
              return;
            }

            min = min <= data.indicator ? min : data.indicator;
            max = max >= data.indicator ? max : data.indicator;
          });

          let parts = 3;
          max = max > 0 ? max : parts;
          let range = max - min;

          let partSize = (range / parts % 1 === 0) ? range / parts : Number((range / parts).toFixed(2));
          for (let i = 0; i < parts; i++) {
            if (i === 0) {
              values.push(max);
            } else {
              let value = Number((max - partSize * i).toFixed(2));
              values.push(value);
            }
          }

          values.push(0);
        } else if (reportTypeIndicator === 'percent') {
          values = [100, 70, 40, 0];
        }

        function styleStates(feature: any) {
          let color = '#fff';
          let reportTypeBoolean = false;
          if (typeof mapData?.data[0]?.indicator === 'string') {
            reportTypeBoolean = true;
          }
          // console.log("TEST", state)
          let lev = parent.drillDownLevel ? parent.drillDownLevel : parent.rbacDetails.role
          if (Number(lev) <= 1) {
            mapData?.data.forEach((state: any) => {
              if (state.state_id && state.state_id == feature.properties.state_code) {
                color = parent.getLayerColor(state.indicator, null, values);
              }
              else if (state.district_id && state.district_id == feature.properties.ID_2) {
                color = parent.getLayerColor(state.indicator, null, values);
              }
            });
          }

          if (parent.level === 'state' || parent.config === 'VSK' || parent.config === 'NVSK') {
            return {
              fillColor: singleColor ? (color === '#fff' ? color : singleColor) : color,
              weight: 1,
              opacity: 1,
              color: 'grey',
              dashArray: '0',
              fillOpacity: 1
            };
          }
          else {
            return
          }

        }

        function getPopUp(feature: any) {
          if (parent.hierarchyLevel > 1 || parent.drillDownLevel > 1) {
            return undefined
          }
          let popup: any;
          mapData.data.forEach((state: any) => {
            if (state.state_id == feature.properties.state_code && !state.district_id) {
              popup = state.tooltip
            }
            else if (state.district_id && state.district_id == feature.properties.ID_2) {
              popup = state.tooltip
            }
          });
          return popup;
        }

        this.countryGeoJSON = L.geoJSON(data['features'], {
          onEachFeature: function (feature: any, layer: any) {
            // if (getPopUp(feature)) {
            //   layer.bindTooltip(getPopUp(feature), { classname: "app-leaflet-tooltip", sticky: true });
            // }
            layer.on({
              click: this.config !== 'NVSK' ? () => { } : () => {
                let lev = parent.drillDownLevel ? parent.drillDownLevel : parent.rbacDetails.role
                if (Number(lev) <= 1) {
                  // parent.drillDownFilter.emit({ id: feature?.properties?.['ID_2'], level: parent.rbacDetails.role });
                  let district_name = parent.getDrillDownDetails(feature?.properties?.['ID_2'], mapData.data)
                  parent.applyDrillDown({ id: feature?.properties?.['ID_2'], hierarchyLevel: parent.rbacDetails.role + 1, name: district_name })
                }
              }
            });
          },
          style: this.config !== 'NVSK' ? () => { } : styleStates,
          color: this.config !== 'NVSK' ? "#6e6d6d" : "#a0a1a3",
          weight: 1,
          fillOpacity: 0,
          fontWeight: "bold"
        }).addTo(this.map);
        this.layerGroup.addLayer(this.countryGeoJSON);
        if (this.hierarchyLevel < 3) {
          this.fitBoundsToCountryBorder();
        }
        // this.countryGeoJSON.eachLayer((layer: any) => {
        //   layer._path.id = StateCodes[Number(layer.feature.properties.state_code)];
        // });

        if (this.hierarchyLevel < 3 && !singleColor) {
          this.createLegend(reportTypeIndicator, this.mapData, values);
        }
        resolve('India map borders plotted successfully');
      } catch (e) {
        reject(e);
      }
    });
  }

  getDrillDownDetails(id: any, data: any) {
    let selectedRow = data.filter((row) => {
      return row?.['district_id'] == id
    })
    return selectedRow?.[0]?.['district_name']
  }

  applyDrillDown(details: any) {
    let drillDownDetails;
    let { hierarchyLevel, id } = details ?? {}

    switch (Number(hierarchyLevel)) {
      case 1:
        drillDownDetails = {
          ...this.rbacDetails,
          hierarchyLevel: hierarchyLevel,
          state: id,
          id: id,
          state_name: details?.name
        }
        break;
      case 2:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          hierarchyLevel: hierarchyLevel,
          district: id,
          id: id,
          district_name: details?.name
        }
        break;
      case 3:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          hierarchyLevel: hierarchyLevel,
          block: id,
          id: id,
          block_name: details?.name
        }
        break;
      case 4:
        drillDownDetails = {
          ...this.rbacDetails,
          role: Number(this.rbacDetails.role) + 1,
          hierarchyLevel: hierarchyLevel,
          cluster: id,
          id: id,
          cluster_name: details?.name
        }
        break;
    }
    this.drillDownDetails = drillDownDetails
    this._drillDownService.emit(drillDownDetails)
  }

  async applyStateBorder(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this._mapService.getCountryGeoJSON();
        console.log(data, 'data')
        const geoJSON = data.features.find(feature => {
          let state_code = feature.properties.state_code_2 || feature.properties.state_code;
          return state_code === this.rbacDetails.state;
        });

        this.stateGeoJSON = L.geoJSON(geoJSON, {
          // style: {
          //   fillColor: '#fff',
          //   weight: 1,
          //   opacity: 1,
          //   color: 'grey',
          //   dashArray: '0',
          //   fillOpacity: 1
          // },
          data: data,
          color: "black",
          weight: 2,
          fillOpacity: 0,
          fontWeight: "bold"
        });
        this.stateGeoJSON.addTo(this.map);
        resolve({ message: 'State borders are applied successfully!', data: this.stateGeoJSON });
      } catch (e) {
        reject(e);
      }
    });
  }

  applyStateWithDistrictsBorder(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this._mapService.getStateGeoJSON(this.drillDownDetails);


        this.stateGeoJSON = L.geoJSON(data, {
          // style: {
          //   fillColor: '#fff',
          //   weight: 1,
          //   opacity: 1,
          //   color: 'grey',
          //   dashArray: '0',
          //   fillOpacity: 1
          // },
          color: "#6e6d6d",
          weight: 2,
          fillOpacity: 0,
          fontWeight: "bold"
        });
        this.stateGeoJSON.addTo(this.map);
        resolve('State borders are applied successfully!');
      } catch (e) {
        reject(e);
      }
    });
  }

  async applyIndiaBorder(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this._mapService.getCountryGeoJSON();

        this.countryGeoJSON = L.geoJSON(data, {
          // style: {
          //   fillColor: '#fff',
          //   weight: 1,
          //   opacity: 1,
          //   color: 'grey',
          //   dashArray: '0',
          //   fillOpacity: 1
          // },
          color: "#6e6d6d",
          weight: 2,
          fillOpacity: 0,
          fontWeight: "bold"
        });
        this.countryGeoJSON.addTo(this.map);
        resolve('State borders are applied successfully!');
      } catch (e) {
        reject(e);
      }
    });
  }

  applyDistrictBorder(): any {
    L.geoJSON(this.districtGeoJSON, {
      // style: {
      //   fillColor: '#fff',
      //   weight: 1,
      //   opacity: 1,
      //   color: 'grey',
      //   dashArray: '0',
      //   fillOpacity: 1
      // },
      color: "#6e6d6d",
      weight: 2,
      fillOpacity: 0,
      fontWeight: "bold"
    }).addTo(this.map);
  }

  fitBoundsToCountryBorder(): void {
    if (this.countryGeoJSON) {
      this.map.fitBounds(this.countryGeoJSON.getBounds(), {
        padding: [50, 50]
      });
    }
  }

  fitToStateBorder(): void {
    if (this.stateGeoJSON) {
      this.map.fitBounds(this.stateGeoJSON.getBounds(), {
        padding: [50, 50]
      })
    }
  }

  fitToMarkers(): void {
    if (this.markers) {
      this.map.fitBounds(this.markers.getBounds(), {
        padding: [150, 150]
      });
    }
  }
// new code for higlight marker according to geojosn 
async createMarkers(mapData: any, prevValues?: any): Promise<void> {
  let reportTypeIndicator = this.mapData?.options && this.mapData.options.reportIndicatorType ? this.mapData.options.reportIndicatorType : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value'

  mapData.data = mapData.data.filter(data => data.indicator !== undefined && data.indicator !== null)

  // console.log(mapData.data)
  if (mapData) {
    // 
    const mapdataArry = mapData.data

    const stateBorderResult = await this.applyStateBorder();

    const stateBorder = stateBorderResult.data.options.data
    // console.log(mapdataArry, 'mapdataArry');
    // console.log(stateBorder.features, 'stateborder')
    const newArray = [];
    if (this.markers) {
      this.markers.clearLayers();
    }
    this.markers = L.layerGroup().addTo(this.map);

    mapdataArry.forEach(obj1 => {
      // console.log(obj1, 'obj1')
      // Find the corresponding object in array2 based on state_id and state_code
      // console.log(stateBorder.features.find(item => item.properties.state_code.toString() === obj1.state_id))
      const obj2 = stateBorder.features.find(item => item.properties.state_code.toString() === obj1.state_id);
      // console.log(obj2)
      // If a matching object is found, replace latitude and longitude
      if (obj2) {
        const updatedObject = {
          ...obj1,
          coordinates: obj2.geometry,


        };
        // Add the updated object to the new array
        newArray.push(updatedObject);
      } else {
        // If no matching object is found, add the original object to the new array
        newArray.push(obj1);
      }
    });
    // Now, array1 has updated latitude and longitude for matching state_id and state_code
    // console.log(newArray,);
    // 
    let min!: number, max!: number, values: any[] = [];
    // % boolen=an {yes,NO}
    if (reportTypeIndicator === 'value' && !prevValues) {
      mapData.data.forEach((data: any, index: number) => {
        if (index === 0) {
          min = data.indicator;
          max = data.indicator;
          return;
        }

        min = min <= data.indicator ? min : data.indicator;
        max = max >= data.indicator ? max : data.indicator;
      });

      let parts = 3;
      max = max > 0 ? max : parts;
      let range = max - min;

      if (range == 0) {
        values.push(min)
      }
      else {
        let partSize = (range / parts % 1 === 0) ? range / parts : Number((range / parts).toFixed(0));
        for (let i = 0; i < parts; i++) {
          if (i === 0) {
            values.push(max);
          }
          else {
            let value = Number((max - partSize * i).toFixed(0));
            values.push(value);
          }
        }

        values.push(0);
      }
    } else if (reportTypeIndicator === 'percent') {
      values = [100, 70, 40, 0];
    }
    else if (prevValues) {
      values = prevValues
    }
    let level = this.drillDownLevel ? this.drillDownLevel : this.hierarchyLevel
    var idProp;
    var nameProp;
    switch (Number(level)) {
      case 0:
        nameProp = 'state_name'
        idProp = 'state_id'
        break;
      case 1:
        nameProp = 'district_name'
        idProp = 'district_id'
        break;
      case 2:
        nameProp = 'block_name'
        idProp = 'block_id'
        break;
      case 3:
        nameProp = 'cluster_name'
        idProp = 'cluster_id'
        break;
    }

    newArray.forEach((data: any) => {
      if(data.state_id != undefined && data.state_name!=null){
      // Create a GeoJSON object for the state.
      // console.log(data.coordinates.coordinates, data, 'data')
      const stateGeoJSON = {
        type: 'Feature',
        geometry: {
          type: data.coordinates.type,
          coordinates: data.coordinates.coordinates
        },
        properties: {
          state_id: data.state_id,
          state_name: data.state_name,
         }
      };
      
      // Determine the color of the state.
      let fillColor;
      if (String(data.program_status).toLowerCase() === "yes. implemented in only online mode") {
        // fillColor = "#29c0c2";
        fillColor='#1D4586'
      } else if (String(data.program_status).toLowerCase() === "yes. implemented in only face-to-face mode") {
        // fillColor = "#705000";
        fillColor='#6D9FEB'
      } else if (String(data.program_status).toLowerCase() === "no. not applicable") {
        // fillColor = "#fff400";
        fillColor='#EBF0F9'
      } 
      else if (String(data.program_status).toLowerCase() === "yes. implemented in both face-to-face and online modes") {
        // fillColor = "#705000";
        fillColor='#1156CC'
      }
      else {
        fillColor = this.getZoneColor(reportTypeIndicator, data.indicator, values);
      }
      // Create a GeoJSON layer for the state and add it to the map.
      L.geoJSON(stateGeoJSON, {
        style: {
          color: "black",
          fillColor: fillColor,
          fillOpacity: 1,
          weight: 1
        },
        onEachFeature: (feature, layer) => {
          layer.on({
            mouseover: (e) => {
              e.target.openPopup();
            },
            mouseout: (e) => {
              e.target.closePopup();
            },
            click: async (e) => {
              if (level < 4 && mapData?.options?.drillDownConfig?.enableDrillDown && mapData?.options?.drillDownConfig?.allowedLevels.includes(level)) {
                this.applyDrillDown({ name: e.target.options.name, id: e.target.options.id, hierarchyLevel: this.drillDownLevel ? this.drillDownLevel + 1 : this.rbacDetails.role + 1 });
              }
            }
          });

          const popup = R.responsivePopup({
            hasTip: false,
            autoPan: true,
            offset: [15, 20],
          }).setContent(data.tooltip);

          layer.bindPopup(popup, { closeButton: false });
        }
      }).addTo(this.markers);
    }
    
    });

    mapData.data.forEach((data: any) => {
      if (data.district_id != undefined && data.district_name != null){
      let re = new RegExp("_id$");
      var id;
      let fillColor = this.getZoneColor(reportTypeIndicator, data.indicator, values)
      
      let markerIcon = L.circleMarker([data.Latitude, data.Longitude], {
        id: data[idProp],
        name: data[nameProp],
        hierarchyLevel: data.hierarchyLevel,
        color: "black",
        fillColor: fillColor,
        fillOpacity: 1,
        strokeWeight: 0.01,
        weight: 1
      }).addTo(this.map);

      markerIcon._path.id = StateCodes[Number(data.state_code)];

      markerIcon.setRadius(5);

      const popup = R.responsivePopup({
        hasTip: false,
        autoPan: true,
        offset: [15, 20],
      }).setContent(
        data.tooltip
      );

      markerIcon.on("mouseover", (e: any) => {
        e.target.openPopup();
      });

      markerIcon.on("mouseout", (e: any) => {
        e.target.closePopup();
      });

      markerIcon.on("click", async (e: any) => {
         console.log(mapData?.options?.drillDownConfig?.allowedLevels.includes(level))
        if (level < 4 && mapData?.options?.drillDownConfig?.enableDrillDown && mapData?.options?.drillDownConfig?.allowedLevels.includes(level)) {
          console.log(mapData?.options?.drillDownConfig?.enableDrillDown)
          this.applyDrillDown({ name: e.target.options.name, id: e.target.options.id, hierarchyLevel: this.drillDownLevel ? this.drillDownLevel + 1 : this.rbacDetails.role + 1 })
        }
      })

      markerIcon.addTo(this.map).bindPopup(popup, { closeButton: false });

      this.markers.addLayer(markerIcon);
    }
   });

    this.map.addLayer(this.markers);
       
    if (!prevValues) {
      if (this.config === 'VSK' || level > 0) {
        if (level === 1) {
          this.fitToStateBorder();
        }
        else {
          this.fitToMarkers()
        }

      }
      else if (this.config === 'NVSK' && level === 0) {
        this.fitBoundsToCountryBorder();
        this.applyStateBorder()
      }
      this.createLegend(reportTypeIndicator, this.mapData, values);
    }
    else if (prevValues && mapData?.data?.length === 0) {
      const NotificationControl = L.Control.extend({
        onAdd: function (map) {
          const container = L.DomUtil.create('div', 'leaflet-notification');
          container.innerHTML = 'No Data for selected legends !';
          return container;
        },

        onRemove: function (map) {
        }
      });
      const notificationControl = new NotificationControl({ position: 'topright' });
      notificationControl.addTo(this.map);
      setTimeout(() => {
        notificationControl.remove()
      }, 2000);
    }
  }
} 
  // old function circle marker 
  //Uncomment for circle on map
  // createMarkers(mapData: any, prevValues?: any): void {
  //   let reportTypeIndicator = this.mapData?.options && this.mapData.options.reportIndicatorType ? this.mapData.options.reportIndicatorType : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value'
  //   mapData.data = mapData.data.filter(data => data.indicator !== undefined && data.indicator !== null)
  //   if (mapData) {
  //     let min!: number, max!: number, values: any[] = [];
  //     if (reportTypeIndicator === 'value' && !prevValues) {
  //       mapData.data.forEach((data: any, index: number) => {
  //         if (index === 0) {
  //           min = data.indicator;
  //           max = data.indicator;
  //           return;
  //         }

  //         min = min <= data.indicator ? min : data.indicator;
  //         max = max >= data.indicator ? max : data.indicator;
  //       });

  //       let parts = 3;
  //       max = max > 0 ? max : parts;
  //       let range = max - min;

  //       if (range == 0) {
  //         values.push(min)
  //       }
  //       else {
  //         let partSize = (range / parts % 1 === 0) ? range / parts : Number((range / parts).toFixed(0));
  //         for (let i = 0; i < parts; i++) {
  //           if (i === 0) {
  //             values.push(max);
  //           }
  //           else {
  //             let value = Number((max - partSize * i).toFixed(0));
  //             values.push(value);
  //           }
  //         }

  //         values.push(0);
  //       }
  //     } else if (reportTypeIndicator === 'percent') {
  //       values = [100, 70, 40, 0];
  //     }
  //     else if (prevValues) {
  //       values = prevValues
  //     }
  //     let level = this.drillDownLevel ? this.drillDownLevel : this.hierarchyLevel
  //     var idProp;
  //     var nameProp;
  //     switch (Number(level)) {
  //       case 0:
  //         nameProp = 'state_name'
  //         idProp = 'state_id'
  //         break;
  //       case 1:
  //         nameProp = 'district_name'
  //         idProp = 'district_id'
  //         break;
  //       case 2:
  //         nameProp = 'block_name'
  //         idProp = 'block_id'
  //         break;
  //       case 3:
  //         nameProp = 'cluster_name'
  //         idProp = 'cluster_id'
  //         break;
  //     }
  //     mapData.data.forEach((data: any) => {
  //       let re = new RegExp("_id$");
  //       // let filterIds = {};
  //       var id;


  //       // Object.keys(data).forEach((prop: any) => {
  //       //   // if(re.test(prop)){
  //       //   //   idProp = prop;
  //       //   //   return false;
  //       //   // }
  //       //   // return true;
  //       //   // if (prop.match(re)) {
  //       //   //   id = data[prop.match(re)?.input]
  //       //   // filterIds = {
  //       //   //   ...filterIds,
  //       //   //   [prop.match(re).input]: data[prop.match(re)?.input]
  //       //   // }
  //       //   // }
  //       //   id = data[idProp]
  //       //   console.log(data[nameProp])
  //       // })
  // 	let fillColor
  // 	if(String(data.program_status).toLowerCase() === "yes. implemented in only online mode"){
  //         fillColor = "#29c0c2"
  // 	} else if(String(data.program_status).toLowerCase() === "yes. implemented in only face-to-face mode"){
  // 		fillColor = "#705000"
  // 	} else if(String(data.program_status).toLowerCase() === "no. not applicable"){
  // 		fillColor = "#fff400"
  // 	} else{
  //         fillColor = this.getZoneColor(reportTypeIndicator, data.indicator, values,data)
  // 	}
  //       let markerIcon = L.circleMarker([data.Latitude, data.Longitude], {
  //         id: data[idProp],
  //         name: data[nameProp],
  //         hierarchyLevel: data.hierarchyLevel,
  //         color: "gray",
  //         // fillColor: this.getZoneColor(reportTypeIndicator, data.indicator >= 1 ? (max - min ? (data.indicator - min) / (max - min) * 100 : data.indicator) : -1),
  //         fillColor: fillColor,
  //         fillOpacity: 1,
  //         strokeWeight: 0.01,
  //         weight: 1
  //       }).addTo(this.map);

  //       markerIcon._path.id = StateCodes[Number(data.state_code)];

  //       markerIcon.setRadius(5);

  //       const popup = R.responsivePopup({
  //         hasTip: false,
  //         autoPan: true,
  //         offset: [15, 20],
  //       }).setContent(
  //         data.tooltip
  //       );

  //       markerIcon.on("mouseover", (e: any) => {
  //         e.target.openPopup();
  //       });

  //       markerIcon.on("mouseout", (e: any) => {
  //         e.target.closePopup();
  //       });

  //       markerIcon.on("click", async (e: any) => {
  //         // if (Number(lev) == 1) {
  //         //   let stateGeoJSON = await this._mapService.getStateGeoJSON();

  //         //   this.districtGeoJSON = stateGeoJSON.features.find(feature => {
  //         //     return feature.properties['ID_2'] == e.target.options.id;
  //         //   });
  //         //   this.applyDrillDown({ id: e.target.options.id, hierarchyLevel: this.rbacDetails.role + 1, name: e.target.options.name })
  //         // }
  //         console.log(mapData?.options?.drillDownConfig?.allowedLevels.includes(level))
  //         if (level < 4 && mapData?.options?.drillDownConfig?.enableDrillDown && mapData?.options?.drillDownConfig?.allowedLevels.includes(level)) {
  //           console.log(mapData?.options?.drillDownConfig?.enableDrillDown)
  //           this.applyDrillDown({ name: e.target.options.name, id: e.target.options.id, hierarchyLevel: this.drillDownLevel ? this.drillDownLevel + 1 : this.rbacDetails.role + 1 })
  //         }
  //       })

  //       markerIcon.addTo(this.map).bindPopup(popup, { closeButton: false });

  //       this.markers.addLayer(markerIcon);
  //     });

  //     this.map.addLayer(this.markers);
  //     if (!prevValues) {
  //       if (this.config === 'VSK' || level > 0) {
  //         if(level === 1) {
  //           this.fitToStateBorder();
  //         }
  //         else {
  //           this.fitToMarkers()
  //         }

  //       }
  //       else if (this.config === 'NVSK' && level === 0) {
  //         this.fitBoundsToCountryBorder();
  //       }
  //       this.createLegend(reportTypeIndicator, this.mapData, values);
  //     }
  //     else if (prevValues && mapData?.data?.length === 0) {
  //       const NotificationControl = L.Control.extend({
  //         onAdd: function (map) {
  //           const container = L.DomUtil.create('div', 'leaflet-notification');
  //           container.innerHTML = 'No Data for selected legends !';
  //           return container;
  //         },

  //         onRemove: function (map) {
  //         }
  //       });
  //       const notificationControl = new NotificationControl({ position: 'topright' });
  //       notificationControl.addTo(this.map);
  //       setTimeout(() => {
  //         notificationControl.remove()
  //       }, 2000);
  //     }
  //   }
  // }

  //new changes create lenged 
  createLegend(reportTypeIndicator: string, mapData: any, values: any): void {
    let mapOptions = mapData.options;
    let legend = L.control({ position: 'topright' });
    let ref = this;
    let labels: any[] = [];

    legend.onAdd = function (map: any) {
      let div = L.DomUtil.create('div', 'info legend text-center');
      let clickable = false;
      if (mapOptions.legend && mapOptions.legend.title) {
        labels.push(`<strong>${mapOptions.selectedMetric ? mapOptions.legend.title + mapOptions.selectedMetric : mapOptions.legend.title}:</strong>`)
      }

      if (reportTypeIndicator === 'boolean') {

        // console.log('mapData.data[0].program', mapData.data[0].program_name)
        // console.log('mapOptions.legend.title', mapOptions.legend)
        // if (mapOptions.legend && mapOptions.legend.title && mapOptions.legend.title == 'Implemented Nishtha'){
        //   if(mapData.data[0].program == 'NISHTHA Elementary'){
        //     values = ["Implemented in only online mode","Implemented in only face-to-face mode","Implemented in both face-to-face and online modes","Not implemented"];
        //   }else if(mapData.data[0].program == 'NISHTHA Secondary' || mapData.data[0].program == 'NISHTHA FLN'){
        //     values = ["Implemented in only online mode","Implemented in only face-to-face mode","Not implemented"];
        //   }else if(mapData.data[0].program == 'NISHTHA ECCE'){
        //     values = ["Implemented in only online mode","Not implemented"];
        //   }else{}
        // }
        if (mapData.data[0].program_name == 'NISHTHA Elementary (Online)') {
          mapData.data[0].program_name = 'NISHTHA Elementary';
          values = ["Implemented in only online mode", "Implemented in only face-to-face mode", "Implemented in both face-to-face and online modes", "Not implemented", "Not applicable"];
        } else if (mapData.data[0].program_name == 'NISHTHA Secondary' || mapData.data[0].program_name == 'NISHTHA FLN') {
          values = ["Implemented in only online mode", "Implemented in only face-to-face mode", "Not implemented"];
        } else if (mapData.data[0].program_name == 'NISHTHA ECCE') {
          values = ["Implemented in only online mode", "Not implemented"];
        }
        else {
          values = ["Yes", "No"];
        }
        for (let i = 0; i < values.length; i++) {
          // labels.push(`<i class="fa fa-square" style="color:${ref.getLayerColor(values[i])}"></i> ${values[i]}`);
          labels.push(`<button class="legend-range" style="background-color: ${ref.getZoneColor(reportTypeIndicator, values[i], values)}; color: ${invert(ref.getZoneColor(reportTypeIndicator, values[i], values), true)}">
          <div class="button-content">
         <span class="value">${values[i]}</span>
        </div>
     </button>`);
        }
      }
      else if (values.length <= 1 && reportTypeIndicator !== 'boolean') {
        // labels.push(`<i class="fa fa-square" style="color:${ref.getLayerColor(values[0] ? values[0] : -1, true)}"></i> ${formatNumberForReport(values[0])}`);
        labels.push(`<button class="legend-range" style="background-color: ${ref.getLayerColor(values[0], true, values)}; color: ${invert(ref.getLayerColor(values[0], true, values), true)}">
          <div class="button-content">
          <span class="value">${values[0] ? values[0] : 0}${reportTypeIndicator === 'percent' ? '%' : ''}</span>
          </div>
          </button><br>`)
      }
      else {
        ref.legendForm = {
          range1: true,
          range2: true,
          range3: true
        };
        values = values && values.length > 0 && reportTypeIndicator !== 'percent' ? values : [100, 70, 40, 0];
        // div.innerHTML = labels[0] + '</br>';
        div.innerHTML = labels[0];

        // Create the reset button element
        const resetButton = L.DomUtil.create('button', 'legend-range-reset pull-right');
        resetButton.innerHTML = '<i class="fa fa-refresh"></i>';
        L.DomEvent.addListener(resetButton, 'click', () => {
          ref.resetRange();
        });
        div.insertBefore(resetButton, div.previousSibling);

        // for (let i = 0; i < values.length - 1; i++) {
        //   let span = L.DomUtil.create('span', 'clickable-range');
        //   span.innerHTML = `<button class="legend-range" style="background-color: ${ref.getLayerColor(values[i], true, values)}; color: ${invert(ref.getLayerColor(values[i], true, values), true)}"><div class="button-content"><input type="checkbox" id="checkbox-${i + 1}" class="legend-checkbox" checked />${values[i + 1]} &dash; ${values[i] ? values[i] : 0}${reportTypeIndicator === 'percent' ? '%' : ''}</div></button><br>`;
        //   L.DomEvent.addListener(span, 'click', () => {
        //     // ref.applyRange(Number(values[i] ? values[i] : 0), Number(values[i + 1]), Number(values[values.length - 1]), ref.getLayerColor(values[i], true, values));
        //     ref.applyRange(i + 1, Number(values[values.length - 1]), ref.getLayerColor(values[i], true, values), Number(values[i] ? values[i] : 0), Number(values[i + 1]))
        //   });
        //   div.appendChild(span);
        //   clickable = true;
        // }

        for (let i = 0; i < values.length - 1; i++) {
          let span = L.DomUtil.create('span', 'clickable-range');
          const lowerValue = values[i + 1];
          const upperValue = values[i] ? values[i] : 0;
          const formattedLowerValue = formatNumberForReport(lowerValue);
          const formattedUpperValue = formatNumberForReport(upperValue);
          span.innerHTML = `
            <button class="legend-range" style="background-color: ${ref.getLayerColor(values[i], true, values)}; color: ${invert(ref.getLayerColor(values[i], true, values), true)}">
                 <div class="button-content">
                <input type="checkbox" id="checkbox-${i + 1}" class="legend-checkbox" checked />
                <span class="value">${formattedLowerValue} &ndash; ${formattedUpperValue}${reportTypeIndicator === 'percent' ? '%' : ''}</span>
               </div>
            </button><br>`;

          L.DomEvent.addListener(span, 'click', () => {
            ref.applyRange(i + 1, Number(values[values.length - 1]), ref.getLayerColor(values[i], true, values), values)
          });
          div.appendChild(span);
          clickable = true;
        }
      }
      if (!clickable) {
        div.innerHTML = labels.join('<br>');
      }
      return div;
    };
    legend.addTo(this.map);
    this.legend?.remove();
    this.legend = legend;
  }

//   //Uncomment for circle on map
// createLegend(reportTypeIndicator: string, mapData: any, values: any): void {
//   let mapOptions = mapData.options;
//   let legend = L.control({ position: 'topright' });
//   let ref = this;
//   let labels: any[] = [];
//   let program ;
//   legend.onAdd = function (map: any) {
//     let div = L.DomUtil.create('div', 'info legend text-center');
//     let clickable = false;
//     if (mapOptions.legend && mapOptions.legend.title) {
//       labels.push(`<strong>${mapOptions.selectedMetric ? mapOptions.legend.title + mapOptions.selectedMetric : mapOptions.legend.title}:</strong>`)
//     }
//     if (reportTypeIndicator === 'boolean') {

//       // console.log('mapData.data[0].program', mapData.data[0].program_name)
//       // console.log('mapOptions.legend.title', mapOptions.legend)
//       // if (mapOptions.legend && mapOptions.legend.title && mapOptions.legend.title == 'Implemented Nishtha'){
//       //   if(mapData.data[0].program == 'NISHTHA Elementary'){
//       //     values = ["Implemented in only online mode","Implemented in only face-to-face mode","Implemented in both face-to-face and online modes","Not implemented"];
//       //   }else if(mapData.data[0].program == 'NISHTHA Secondary' || mapData.data[0].program == 'NISHTHA FLN'){
//       //     values = ["Implemented in only online mode","Implemented in only face-to-face mode","Not implemented"];
//       //   }else if(mapData.data[0].program == 'NISHTHA ECCE'){
//       //     values = ["Implemented in only online mode","Not implemented"];
//       //   }else{}
//       // }
//       if (mapData.data[0].program_name == 'NISHTHA Elementary (Online)') {
//         mapData.data[0].program_name = 'NISHTHA Elementary';
//         values = ["Implemented in only online mode", "Implemented in only face-to-face mode", "Implemented in both face-to-face and online modes", "Not implemented", "Not applicable"];
//       } else if (mapData.data[0].program_name == 'NISHTHA Secondary' || mapData.data[0].program_name == 'NISHTHA FLN') {
//         values = ["Implemented in only online mode", "Implemented in only face-to-face mode", "Not implemented"];
//       } else if (mapData.data[0].program_name == 'NISHTHA ECCE') {
//         values = ["Implemented in only online mode", "Not implemented"];
//       }
//       else {
//         values = ["Yes", "No"];
//       }
//       for (let i = 0; i < values.length; i++) {
//         // labels.push(`<i class="fa fa-square" style="color:${ref.getLayerColor(values[i])}"></i> ${values[i]}`);
//         labels.push(`<button class="legend-range" style="background-color: ${ref.getZoneColor(reportTypeIndicator, values[i], values ,mapData.data[0])}; color: ${invert(ref.getZoneColor(reportTypeIndicator, values[i], values), true)}">
//         <div class="button-content">
//        <span class="value">${values[i]}</span>
//       </div>
//    </button>`);
//       }
//     }
//     else if (values.length <= 1 && reportTypeIndicator !== 'boolean') {
//       if(String(mapData.data[0].category_name)!== undefined && String(mapData.data[0].category_name)!== null && String(mapData.data[0].category_name).includes("microimprovement")){
//         program = "microimprovement";       
//      }
//       // labels.push(`<i class="fa fa-square" style="color:${ref.getLayerColor(values[0] ? values[0] : -1, true)}"></i> ${formatNumberForReport(values[0])}`);
//       labels.push(`<button class="legend-range" style="background-color: ${ref.getLayerColor(values[0], true, values,program)}; color: ${invert(ref.getLayerColor(values[0], true, values,program), true)}">
//         <div class="button-content">
//         <span class="value">${values[0] ? values[0] : 0}${reportTypeIndicator === 'percent' ? '%' : ''}</span>
//         </div>
//         </button><br>`)
//     }
//     else {
//       if(String(mapData.data[0].category_name)!== undefined && String(mapData.data[0].category_name)!== null && String(mapData.data[0].category_name).includes("microimprovement")){
//         program = "microimprovement";       
//      }
//       ref.legendForm = {
//         range1: true,
//         range2: true,
//         range3: true
//       };
//       values = values && values.length > 0 && reportTypeIndicator !== 'percent' ? values : [100, 70, 40, 0];
//       // div.innerHTML = labels[0] + '</br>';
//       div.innerHTML = labels[0];

//       // Create the reset button element
//       const resetButton = L.DomUtil.create('button', 'legend-range-reset pull-right');
//       resetButton.innerHTML = '<i class="fa fa-refresh"></i>';
//       L.DomEvent.addListener(resetButton, 'click', () => {
//         ref.resetRange();
//       });
//       div.insertBefore(resetButton, div.previousSibling);

//       // for (let i = 0; i < values.length - 1; i++) {
//       //   let span = L.DomUtil.create('span', 'clickable-range');
//       //   span.innerHTML = `<button class="legend-range" style="background-color: ${ref.getLayerColor(values[i], true, values)}; color: ${invert(ref.getLayerColor(values[i], true, values), true)}"><div class="button-content"><input type="checkbox" id="checkbox-${i + 1}" class="legend-checkbox" checked />${values[i + 1]} &dash; ${values[i] ? values[i] : 0}${reportTypeIndicator === 'percent' ? '%' : ''}</div></button><br>`;
//       //   L.DomEvent.addListener(span, 'click', () => {
//       //     // ref.applyRange(Number(values[i] ? values[i] : 0), Number(values[i + 1]), Number(values[values.length - 1]), ref.getLayerColor(values[i], true, values));
//       //     ref.applyRange(i + 1, Number(values[values.length - 1]), ref.getLayerColor(values[i], true, values), Number(values[i] ? values[i] : 0), Number(values[i + 1]))
//       //   });
//       //   div.appendChild(span);
//       //   clickable = true;
//       // }

//       for (let i = 0; i < values.length - 1; i++) {
//         let span = L.DomUtil.create('span', 'clickable-range');
//         const lowerValue = values[i + 1];
//         const upperValue = values[i] ? values[i] : 0;
//         const formattedLowerValue = formatNumberForReport(lowerValue);
//         const formattedUpperValue = formatNumberForReport(upperValue);
//         span.innerHTML = `
//           <button class="legend-range" style="background-color: ${ref.getLayerColor(values[i], true, values,program)}; color: ${invert(ref.getLayerColor(values[i], true, values,program), true)}">
//                <div class="button-content">
//               <input type="checkbox" id="checkbox-${i + 1}" class="legend-checkbox" checked />
//               <span class="value">${formattedLowerValue} &ndash; ${formattedUpperValue}${reportTypeIndicator === 'percent' ? '%' : ''}</span>
//              </div>
//           </button><br>`;

//         L.DomEvent.addListener(span, 'click', () => {
//           ref.applyRange(i + 1, Number(values[values.length - 1]), ref.getLayerColor(values[i], true, values), values)
//         });
//         div.appendChild(span);
//         clickable = true;
//       }
//     }
//     if (!clickable) {
//       div.innerHTML = labels.join('<br>');
//     }
//     return div;
//   };
//   legend.addTo(this.map);
//   this.legend?.remove();
//   this.legend = legend;
// }

  

 
 // new get zonecolor 
 getZoneColor(reportTypeIndicator: string, value: string | number, values?: number[]) {
  if (reportTypeIndicator === 'boolean') {
    if (String(value).toLowerCase() == "yes") {
      return "#1D4586"; // Blue
    } else if (String(value).toLowerCase() == "implemented in only online mode") {
      return "#1D4586"; // Deep Sky Blue
    } else if (String(value).toLowerCase() == "implemented in only face-to-face mode") {
      return "#6D9FEB"; // Dodger Blue
    } else if (String(value).toLowerCase() == "implemented in both face-to-face and online modes") {
      return "#1156CC"; // Royal Blue
    } else if (String(value).toLowerCase() == "not implemented") {
      return "#C9DAF7"; // Dark Blue
    } else if (String(value).toLowerCase() == "not applicable") {
      return "#EBF0F9"; // Light Sky Blue
    } else {
      return "#C9DAF7"; // Dark Blue
    }
  }
  else if (values && values.length === 1) {
    return "#1156CC"; // Royal Blue
  }
  else {
    let colors = ["#1D4586", "#1156CC", "#6D9FEB"];
    let color = "#fff";
    value = Number(value);
    for (let i = 0; i < values.length - 1; i++) {
      if (value <= values[i] && value >= values[i + 1]) {
        color = colors[i];
      }
    }

    return color;
  }
}

// //Uncomment for circle on map
// getZoneColor(reportTypeIndicator: string, value: string | number, values?: number[] ,data ?: any) {
//     if (reportTypeIndicator === 'boolean') {
//     if (String(value).toLowerCase() == "yes") {
//       return "#007000";
//     } else if (String(value).toLowerCase() == "implemented in only online mode") {
//       return "#29c0c2";
//     } else if (String(value).toLowerCase() == "implemented in only face-to-face mode") {
//       return "#705000";
//     } else if (String(value).toLowerCase() == "implemented in both face-to-face and online modes") {
//       return "#007000";
//     } else if (String(value).toLowerCase() == "not implemented") {
//       return "#D2222D";
//     } else if (String(value).toLowerCase() == "not applicable") {
//       return "#fff400";
//     } else {
//       return "#D2222D";
//     }
//   }
//   else if (values && values.length === 1) {
//     return "#007000"
//   }
//   else {
//     let colors;
//     if(String(data.category_name)!== undefined && String(data.category_name)!== null && String(data.category_name).includes("microimprovement")){
//      colors = ["#007000", "#4CBB17", "#0BDA51"];
//     }else{
//      colors = ["#007000", "#FFBF00", "#D2222D"];
//     }
//     let color = "#fff";
//     value = Number(value);
//     for (let i = 0; i < values.length - 1; i++) {
//       if (value <= values[i] && value >= values[i + 1]) {
//         color = colors[i];
//       }
//     }

//     return color;
//   }
// }
  resetRange() {
    // this.applyCountryBorder(this.mapData)
    this.createMarkers(this.mapData)
  }

  applyRange(index: any, baseValue: any, rangeColour: any, values: any) {
    let range1Data = [], range2Data = [], range3Data = []
    switch (index) {
      case 1:
        let checkbox1 = <HTMLInputElement>document.getElementById('checkbox-1');
        checkbox1.checked = !this.legendForm.range1
        this.legendForm.range1 = !this.legendForm.range1
        break;
      case 2:
        let checkbox2 = <HTMLInputElement>document.getElementById('checkbox-2');
        checkbox2.checked = !this.legendForm.range2
        this.legendForm.range2 = !this.legendForm.range2
        break;
      case 3:
        let checkbox3 = <HTMLInputElement>document.getElementById('checkbox-3');
        checkbox3.checked = !this.legendForm.range3
        this.legendForm.range3 = !this.legendForm.range3
        break;
    }
    if (this.legendForm.range1) {
      range1Data = this.mapData.data.filter((obj: any) => {
        return obj.indicator <= values[0] && (values[1] === baseValue ? obj.indicator >= values[1] : obj.indicator > values[1])
      });
    }
    if (this.legendForm.range2) {
      range2Data = this.mapData.data.filter((obj: any) => {
        return obj.indicator <= values[1] && (values[2] === baseValue ? obj.indicator >= values[2] : obj.indicator > values[2])
      });
    }
    if (this.legendForm.range3) {
      range3Data = this.mapData.data.filter((obj: any) => {
        return obj.indicator <= values[2] && (values[3] === baseValue ? obj.indicator >= values[3] : obj.indicator > values[3])
      });
    }

    let filteredData = {
      ...this.mapData,
      data: [range1Data, range2Data, range3Data].flat()
    };

    this.markers.clearLayers();
    this.createMarkers(filteredData, values);
  }
}