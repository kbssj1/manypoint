import type GeoJSON from "geojson";
import { SvgPath } from "./SvgPath";
import { geoMercator, geoPath } from "./d3-geo/index";
import { Object } from "./Object";
import { Scheduler } from "./Scheduler";

interface ISomeCoolInterface {
  some: 'string';
  cool: 'string';
  props: 'string' 
}  

/**
 * 
 * 
 */
export class GeoData implements Object {
  private geoDatas:any[] = [];
  private s:Scheduler = new Scheduler();
  public colors:string[] = [];
  public positionX: number = 0;
  public positionY: number = 0;
  public scale: number = 0;
  public transform: string = '';

  constructor(geoData: any) {
    geoData.features.map((feature : any) => {

      const { I: isoCode, N: countryName, C: coordinates } = feature;
      const geoFeature: GeoJSON.Feature = {
        type: "Feature",
        properties: { NAME: countryName, ISO_A2: isoCode },
        geometry: {
          type: "MultiPolygon",
          coordinates: coordinates as GeoJSON.Position[][][],
        },
      };

      let path = new SvgPath(geoFeature.geometry);
      this.geoDatas.push({path:path.path, countryName: geoFeature.properties?.NAME});
    });
    //
    this.colors.push("#" + "C870E0");
    this.colors.push("#" + "6E5FD3");
    this.colors.push("#" + "5079F9");
    this.colors.push("#" + "7BE276");
    this.colors.push("#" + "EBED68");
    this.colors.push("#" + "EBBA54");
    this.colors.push("#" + "F06976");
    this.colors.push("#" + "8D3047");
    this.colors.push("#" + "F8F1EF");
    this.colors.push("#" + "F4FAF8");
  }
  

  public get geoData() {
    return this.geoDatas;
  }

  public setPosition(positionX:number, positionY:number) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.transform = `translate(${this.positionX}, ${this.positionY}) scale(${this.scale}, ${-this.scale})`;
    return this;
  }

  public translate(x: number, y: number, callback: Function, time:number=0) {
    this.s.push('', () => {
      this.positionX = this.positionX + x;
      this.positionY = this.positionY + y;
      this.transform = `translate(${this.positionX}, ${this.positionY}) scale(${this.scale}, ${-this.scale})`;
      callback();
    }, time);
    this.s.run();
  }

  public setScale(scale:number, time:number=0) {
    this.scale = scale
    this.transform = `translate(${this.positionX}, ${this.positionY}) scale(${this.scale}, ${-this.scale})`;
    return this;
  }
}