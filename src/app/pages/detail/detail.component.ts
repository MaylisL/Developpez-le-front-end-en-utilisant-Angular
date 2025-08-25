
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  country$!: Observable<Olympic | null>;
  totalMedals = 0;
  totalAthletes = 0;
  totalParticipations = 0;

  lineChartData: ChartConfiguration<'line'>['data'] = { labels: [], datasets: [] };
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
        position: 'top'
      },
      datalabels: {
        display: false
      },
      tooltip: {
        backgroundColor: '#00818d',
        displayColors: false,
        titleAlign: 'center',
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
    scales: {
      x: { title: { display: true, text: 'Dates' } },
      y: {
        title: {
          display: true,
          text: 'Number of Medals'
        },
        beginAtZero: true,
      }
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private olympicService: OlympicService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.country$ = this.route.paramMap.pipe(
      map(params => Number(params.get('id'))),
      switchMap(id => this.olympicService.getOlympicById(id)),
      tap(country => {
        if (country) {
          this.prepareChartData(country);
          this.prepareStats(country);
          this.cdr.detectChanges();
        } else {
          this.router.navigate(['notFound']);
        }
      })
    );
  }

  private prepareStats(country: Olympic): void {
    this.totalMedals = country.participations.reduce(
      (sum, p) => sum + p.medalsCount,
      0
    );

    this.totalAthletes = country.participations.reduce(
      (sum, p) => sum + p.athleteCount,
      0
    );

    this.totalParticipations = country.participations.length;
  }

  private prepareChartData(country: Olympic): void {
    const years = country.participations.map(p => p.year);
    const medals = country.participations.map(p => p.medalsCount);

    this.lineChartData = {
      labels: years,
      datasets: [
        {
          data: medals,
          label: `medals`,
          borderColor: '#00818d',
          pointBackgroundColor: '#56abb3',
          tension: 0.3
        }
      ]
    };
  }
}
