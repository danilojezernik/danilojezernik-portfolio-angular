import { Directive, ElementRef } from '@angular/core';

/**
 * Directive to add a footer with a copyright
 * */

@Directive({
  selector: '[appCopyright]',
  standalone: true
})
export class CopyrightDirective {

  /**
   * ElementRef is used to access and manipulate the underlying HTML element attached to the directive.
   * nativeElement property contains the actual native HTML element
   * */

  constructor(el: ElementRef) {
    const currentYear = new Date().getFullYear(); // Get the current year
    const targetElement: HTMLElement = el.nativeElement; // Access the native HTML element

    // Add classes to style the element
    targetElement.classList.add('p-2', 'text-center')

    // Set the text content of the element to include the copyright notice
    targetElement.textContent = `© ${currentYear} - Portfolio by Danilo Jezernik`
  }

}
