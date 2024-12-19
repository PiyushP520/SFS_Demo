import { Component, Input } from '@angular/core';
import * as d3 from 'd3';
import { interval } from 'rxjs';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent {
  @Input() eventData: any | null = null;  
  private svg: any;
  private x: any;
  private y: any;
  private line: any;
  private data: any[] = [];

  ngOnInit() {
    this.createSvg();
    this.createLine();
    // interval(1000).subscribe(() => {
    //   this.receiveNewData();
    // });
  }

  ngOnChanges(){
    if(this.eventData){
      this.receiveNewData({
        timestamp: this.eventData.timestamp,
        partsPerMinute: this.eventData.partsPerMinute
      })
    }
  }

  createSvg() {
    this.svg = d3.select('svg')
      .attr('width', 700)
      .attr('height', 500)
      .append('g')
      .attr('transform', 'translate(50, 20)');

    this.x = d3.scaleTime().range([0, 800]);
    this.y = d3.scaleLinear().range([400, 0]);

    this.x.domain([0, 60]); // last 60 seconds
    this.y.domain([0, 200]); // assuming parts per minute range is 0-200

    this.svg.append('g')
    .attr('class', 'axis x')
    .attr('transform', `translate(0,${400})`)
    .call(d3.axisBottom(this.x).ticks(60));

  this.svg.append('g')
    .attr('class', 'axis y')
    .call(d3.axisLeft(this.y));

    this.svg.append('text')
    .attr('class', 'x-axis-label')
    .attr('text-anchor', 'end')
    .attr('x', 800 / 2)
    .attr('y', 400 + 40) 
    .text('Timestamp');

    this.svg.append('text')
    .attr('class', 'y-axis-label')
    .attr('text-anchor', 'middle')
    .attr('x', -180) 
    .attr('y', -40) 
    .attr('transform', 'rotate(-90)')
    .text('Parts Per Minute');

  }

  private createLine(): void {
    this.line = d3.line<any>()
      .x(d => this.x(d.timestamp))
      .y(d => this.y(d.partsPerMinute));

    this.svg.append('path')
      .datum(this.data)
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5);
  }

  private receiveNewData(data:any) {
    const newData: any = data;
    this.data.push(newData);
    this.data = this.data.filter(d => d.timestamp > Date.now() - 60000);
    this.updateChart();
  }

  private updateChart(): void {
    this.x.domain([Date.now() - 60000, Date.now()]);

    this.svg.select('.line')
      .datum(this.data)
      .attr('d', this.line);

    this.svg.select('.axis.x')
      .call(d3.axisBottom(this.x));

    this.svg.select('.axis.y')
      .call(d3.axisLeft(this.y));
  }
}
