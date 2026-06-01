import { Component, input, output, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  imports: [FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
})
export class SearchBoxComponent {
  readonly placeholder = input('Search...');
  readonly value = model('');
  readonly searchChange = output<string>();

  onInput(value: string): void {
    this.value.set(value);
    this.searchChange.emit(value);
  }
}
