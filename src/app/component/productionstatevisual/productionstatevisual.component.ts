import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-productionstatevisual',
  templateUrl: './productionstatevisual.component.html',
  styleUrls: ['./productionstatevisual.component.scss']
})
export class ProductionstatevisualComponent implements OnInit, OnChanges {
  @Input() orderData: any = '';
  private data: number[] = [];
  private svg: any;
  private tooltip: any;
  private margin = { top: 20, right: 30, bottom: 50, left: 50 };
  private width = 700 - this.margin.left - this.margin.right;
  private height = 400 - this.margin.top - this.margin.bottom;
  productionTarget: number = 0;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['orderData'] && this.orderData) {
      this.data.push(parseInt(this.orderData.productionState));

      if (this.data.length > 10) {
        this.data.shift();
      }

      this.productionTarget = parseInt(this.orderData.productionTarget);
      this.updateChart();
    }
  }

  ngOnInit(): void {
    this.createSvg();
    this.createTooltip();
    this.addAxes();
  }

  private createSvg(): void {
    this.svg = d3.select(this.el.nativeElement).select('svg')
      .attr('width', 700)
      .attr('height', 400)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  private createTooltip(): void {
    this.tooltip = d3.select(this.el.nativeElement).append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background', 'rgba(0, 0, 0, 0.7)')
      .style('color', '#fff')
      .style('padding', '8px')
      .style('border-radius', '4px')
      .style('font-size', '12px');
  }

  private updateChart(): void {
    this.svg.selectAll('*').remove(); // Clear previous elements
    this.addAxes();
    this.drawBars();
  }

  private drawBars(): void {
    const latestData = this.data.slice(-10);

    const xScale = d3.scaleBand()
      .domain(latestData.map((_, i) => i.toString()))
      .range([0, this.width])
      .padding(0.5);

    const yScale = d3.scaleLinear()
      .domain([0, this.productionTarget])
      .range([this.height, 0]);

    this.svg.selectAll('.bar')
      .data(latestData)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d: any, i: any) => xScale(i.toString()) as number)
      .attr('y', (d: any) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d: any) => this.height - yScale(d))
      .on('mouseover', (event: any, d: any) => {
        this.tooltip.style('visibility', 'visible').text(`Value: ${d}`);
      })
      .on('mousemove', (event: any) => {
        this.tooltip
          .style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', () => {
        this.tooltip.style('visibility', 'hidden');
      });
  }

  private addAxes(): void {
    const xScale = d3.scaleBand()
      .domain(this.data.map((_, i) => i.toString()))
      .range([0, this.width])
      .padding(0.1);

    const yScale = d3.scaleLinear()
      .domain([0, this.productionTarget])
      .range([this.height, 0]);

    this.svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(xScale).tickFormat(d => `Bar ${d}`));

    this.svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale));

    this.svg.append('text')
      .attr('class', 'y-axis-label')
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .attr('y', -this.margin.left + 20)
      .attr('x', -this.height / 2)
      .text('Total Production Target');

    this.svg.append('text')
      .attr('class', 'x-axis-label')
      .attr('text-anchor', 'middle')
      .attr('x', this.width / 2)
      .attr('y', this.height + this.margin.bottom - 10)
      .text('Production Completed Till Now');
  }
}