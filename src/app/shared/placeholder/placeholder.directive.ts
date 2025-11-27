import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  standalone: false,
  selector: '[appPlaceholder]',

})
export class PlaceHolderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }

}
