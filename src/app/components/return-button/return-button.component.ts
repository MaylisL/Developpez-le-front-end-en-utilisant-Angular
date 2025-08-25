import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-button',
  templateUrl: './return-button.component.html',
  styleUrl: './return-button.component.scss'
})
export class ReturnButtonComponent {
  @Input() route: string = '/';

  constructor(private router: Router) { }

  goBack(): void {
    this.router.navigate([this.route]);
  }
}
