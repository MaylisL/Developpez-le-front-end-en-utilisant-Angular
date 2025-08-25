import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { ChartConfiguration, ChartType, ChartEvent, ChartData, ActiveElement } from 'chart.js';
import { Olympic } from 'src/app/core/models/Olympic';
import { Router } from '@angular/router';
import { ChartClickEvent } from 'src/app/core/models/ChartTypeEvent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  public olympics$: Observable<Olympic[] | null> = of(null);
  public totalJo = 0;
  public totalCountries = 0;

  public pieChartType: ChartType = 'pie';
  public pieChartData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
      datalabels: {
        formatter: (value, context) => {
          return context.chart.data.labels?.[context.dataIndex] || '';
        },
        color: '#000',
        anchor: 'end',
        align: 'end',
        offset: 10,
        font: {
          weight: 400,
          size: 18,
          family: 'Montserrat'
        }
      },
      tooltip: {
        backgroundColor: '#00818d',
        displayColors: false,
        titleFont: {
          weight: 200,
          size: 16,
          family: 'Montserrat'
        },
        bodyAlign: 'center',
        bodyFont: {
          weight: 200,
          size: 16,
          family: 'Montserrat'
        },
      }
    },
    layout: {
      padding: 100
    }
  };

  constructor(private olympicService: OlympicService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics().pipe(
      tap(olympics => {
        if (olympics && olympics.length > 0) {
          this.prepareStats(olympics);
          this.prepareChartData(olympics);
          this.cdr.detectChanges();
        }
      })
    );
  }

  private prepareStats(olympics: Olympic[]): void {
    const years = new Set<number>();

    olympics.forEach(olympic => {
      olympic.participations.forEach(p => years.add(p.year));
    });

    this.totalJo = years.size;
    this.totalCountries = olympics.length;
  }


  private prepareChartData(olympics: Olympic[]): void {
    this.pieChartData = {
      labels: olympics.map(olympic => olympic.country),
      datasets: [
        {
          data: olympics.map(olympic =>
            olympic.participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
          ),
          backgroundColor: ['#793d52', '#89a1db', '#b8cbe7', '#977ea1', '#bfe0f1'],
          borderWidth: 0,
        }
      ]
    };
  }

  onChartClick(event: ChartClickEvent, olympics: Olympic[]): void {
    const active = event.active as ActiveElement[];
    if (!active || active.length === 0) return;

    const index = active[0].index;
    const id = olympics[index].id;
    this.router.navigate(['/detail', id]);
  }
}
