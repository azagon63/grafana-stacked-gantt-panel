# Stacked Gantt chart for Grafana

A panel plugin for [Grafana](https://grafana.com) to visualize stacked Gantt charts.

Gantt charts display a list of _tasks over time_, where each task is visualized using a bar with a start and an end time.

This plugin is based on the original Gantt chart plugin by Marcus Olsson: https://github.com/marcusolsson/grafana-gantt-panel

## Features

- Identify bottlenecks where one or more tasks are running significantly longer than others
- Compare recurring sets of tasks by grouping them, such as data pipelines that run in regular intervals.
- Display concurrency of tasks to identify resource usage or workload.
- Display additional metadata from your data source as labels

![Screenshot](https://github.com/azagon63/grafana-stacked-gantt-panel/raw/main/src/img/dark.png)

## Configuration

This section lists the available configuration options for the Gantt panel.

### Panel options

#### Experiments

By enabling experiments, you can try out new features that we're working on. **Experiments can be unstable and may break your panel**. Use at your own risk.

#### Dimensions

| Option       | Description                                                                                                                                                                                                                                                                                       |
|--------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| _Text_       | Name of the field to use for task labels. Defaults to the first string field.                                                                                                                                                                                                                     |
| _Start time_ | Name of the field to use for value. Defaults to the first time field.                                                                                                                                                                                                                             |
| _End time_   | Name of the field to use for value. Defaults to the second time field.                                                                                                                                                                                                                            |
| _Color by_   | Field to use for colors. Defaults to the text field. Color configuration depends on the field type. If the dimension is set to a string field, you can add _color mappings_ for each value. If the dimension is set to a number field, you can instead use field options to configure the colors. |
| _Group by_   | Name of the field to use to group tasks. When grouping tasks, the time interval is set to the start of the first task and the end of the last task in the group.                                                                                                                                  |
| _Labels_     | Fields to use as labels in the tooltip.                                                                                                                                                                                                                                                           |

As some data sources don't yet support time fields, the plugin supports selecting string and number fields as start and end time:

- If you select a string field, values need to be ISO 8601 strings
- If you select a number field, values need to be Unix timestamps in milliseconds

#### Display

| Option            | Description                                                                        |
|-------------------|------------------------------------------------------------------------------------|
| _Show Y-axis_     | Toggles the Y-axis.                                                                |
| _Stack direction_ | Direction to stack tasks for visual clarity.                                       |
| _Color mappings_  | Configures task color based on the text value based on the **Color by** dimension. |
