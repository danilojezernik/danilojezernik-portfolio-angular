import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-my-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-skills.component.html'
})
export class MySkillsComponent {

  @ViewChild('animationContainer') animationContainer: ElementRef;

  GLOBAL_CFG = {
    loop: true
  };

  ngAfterViewInit(): void {
    this.animateSwet();
    this.animateSpit();
    this.animateDebre();
    this.animateGear();
    this.animateArrows();
    this.animateHands();
    this.animateMouth();
  }

  getRndInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  animateSwet(): void {
    const swetCollection = this.animationContainer.nativeElement.querySelectorAll('.swet');
    swetCollection.forEach((el: any, index: any) => {
      anime({
        ...this.GLOBAL_CFG,
        targets: el,
        opacity: [0, 1, 0],
        delay: index * 100,
        duration: index * 1500,
        translateY: index * 2,
        easing: 'easeInOutSine'
      });
    });
  }

  animateSpit(): void {
    const spitCollection = this.animationContainer.nativeElement.querySelectorAll('.spit');
    spitCollection.forEach((el: any, index: any) => {
      anime({
        ...this.GLOBAL_CFG,
        targets: el,
        opacity: [0, 1, 0],
        delay: 500,
        duration: index * 1000,
        translateY: this.getRndInteger(-30, 30),
        translateX: this.getRndInteger(-30, 30),
        easing: 'easeInOutSine'
      });
    });
  }

  animateDebre(): void {
    const debreCollection = this.animationContainer.nativeElement.querySelectorAll('.debre');
    debreCollection.forEach((el: any, index: any) => {
      anime({
        ...this.GLOBAL_CFG,
        targets: el,
        opacity: [0, 1, 0],
        delay: index * 100,
        duration: index * 100,
        scaleX: 1.3,
        scaleY: 1.3,
        translateY: this.getRndInteger(-10, -40),
        translateX: this.getRndInteger(-30, 30),
        easing: 'linear'
      });
    });
  }

  animateGear(): void {
    anime({
      ...this.GLOBAL_CFG,
      targets: '#gear1 path',
      rotate: 360,
      easing: 'linear'
    });

    anime({
      ...this.GLOBAL_CFG,
      targets: '#gear2 path',
      rotate: -360,
      easing: 'linear'
    });
  }

  animateArrows(): void {
    anime({
      ...this.GLOBAL_CFG,
      targets: '#shortArrow',
      rotate: 360,
      duration: 10000,
      easing: 'linear',
      transformOrigin: ['4px 25px 0', '6px 27px 0']
    });

    anime({
      ...this.GLOBAL_CFG,
      targets: '#longArrow',
      rotate: 360,
      duration: 800,
      easing: 'linear',
      transformOrigin: ['2px 32px 0', '10px 39px 0']
    });
  }

  animateHands(): void {
    anime({
      ...this.GLOBAL_CFG,
      targets: '#leftHand',
      rotate: 6,
      duration: 1000,
      direction: 'alternate',
      easing: 'easeInOutQuart',
      transformOrigin: ['2px 32px 0', '10px 39px 0']
    });

    anime({
      ...this.GLOBAL_CFG,
      targets: '#rightHand',
      rotate: 6,
      duration: 500,
      direction: 'alternate',
      easing: 'easeInOutBack',
      transformOrigin: ['280px 120px 0', '280px 120px 0']
    });
  }

  animateMouth(): void {
    anime({
      ...this.GLOBAL_CFG,
      targets: '#mounth',
      rotate: 2,
      scaleX: 1.1,
      scaleY: [1.2, 0.9],
      duration: 1500,
      direction: 'alternate',
      easing: 'easeInOutElastic',
      transformOrigin: ['30px 30px 0', '30px 30px 0']
    });
  }
}
