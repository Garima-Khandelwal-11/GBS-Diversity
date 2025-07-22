import React, { useEffect } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

const MatchScoreChart = () => {
  useEffect(() => {
    // Create root element
    const root = am5.Root.new('chartdiv');

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 20,
      })
    );

    // Add data
    const data = [
      { category: 'Match Score 1', value: 10 },
      { category: 'Match Score 2', value: 15 },
      { category: 'Match Score 3', value: 25 },
      { category: 'Match Score 4', value: 30 },
      { category: 'Match Score 5', value: 20 },
    ];

    // Create axes
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 30 }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(data);

    xAxis.get('renderer').grid.template.setAll({
      strokeOpacity: 0, // Remove vertical grid lines
    });

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0, // Remove vertical axis line
        }),
      })
    );

    yAxis.get('renderer').grid.template.setAll({
      strokeOpacity: 0.2, // Remove horizontal grid lines
    });

    // Create series
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        categoryXField: 'category',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      })
    );

    series.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });

    series.data.setAll(data);

    // Animate on load
    series.appear(1000);
    chart.appear(1000, 100);

    // Cleanup on component unmount
    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div id="chartdiv" style={{ width: '90%', height: '500px', margin: '0 auto' }}></div>
  );
};

export default MatchScoreChart;
