import { React, jsx, AllWidgetProps } from "jimu-core";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { JimuDraw, JimuDrawCreationMode } from "jimu-ui/advanced/map";
import { Point, Polyline } from "@arcgis/core/geometry";
import Geometry from "@arcgis/core/geometry/Geometry";
import Graphic from "@arcgis/core/Graphic";
import SimpleMarkerSymbol from "@arcgis/core/symbols/SimpleMarkerSymbol";
import MapView from "@arcgis/core/views/MapView";
import { render } from "@testing-library/react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

const Widget = (props: AllWidgetProps<any>) => {
  const [currentJimuMapView, setCurrentJimuMapView] = React.useState(null); 

  const handleActiveViewChange = (jimuMapView) => {
    setCurrentJimuMapView(jimuMapView);
  };

  function addPointToMap (p_x, p_y, p_jmv) {
    //If click_point_Layer doesn't exist, create it.
    if(p_jmv.view.map.findLayerById("click_point_layer") == null) {
      let new_layer = new GraphicsLayer({
      id: "click_point_layer"
      })
      p_jmv.view.map.add(new_layer);
    }
    
    let layer = p_jmv.view.map.findLayerById("click_point_layer");

    console.log("addPointToMap")
    const pointSymbol = new SimpleMarkerSymbol({
    style: 'square',
    color: 'blue',
    size: '25px',
    outline: {
    color: [255, 255, 0],
    width: 8,
    },
    });
    const graphicB = new Graphic({
    geometry: new Point({ x: p_x, y: p_y}), //SR necessary?
    symbol: pointSymbol
    });

    //Assignment should overwrite existing points....In theory.
    layer.graphics = [graphicB];
    
 
  }

  const activeViewChangeHandler = (jmv: JimuMapView) => {

    if (jmv) {
      setCurrentJimuMapView(jmv)
      jmv.view.on("pointer-move", (evt) => {
        const point: Point = jmv.view.toMap({
          x: evt.x,
          y: evt.y
        });
        console.log(point.latitude.toFixed(20));

      });

      jmv.view.on("click", (evt) => {
        const point: Point = jmv.view.toMap({
          x: evt.x,
          y: evt.y
        });
        //Create a graphic with SketchViewModel where the user clicked
        console.log(point.latitude.toFixed(20));
        console.log(point.longitude.toFixed(20));
        addPointToMap(point.longitude, point.latitude, jmv)
        console.log("clicked on map")
        
      });
    }
  };

  return <div className="widget-starter jimu-widget">This is your starter widget!
  
    <button onClick={() => {
      console.log(currentJimuMapView)
    }}>Inspect JMV</button>

    <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds?.[0]} onActiveViewChange={activeViewChangeHandler} />
    
  </div>;
};

export default Widget;
