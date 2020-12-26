import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { WindowsSizeListenerService } from '@common/services/util/windows-size-listener.service';
import { faChevronDown, faChevronRight, faPlus, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { takeWhile } from 'rxjs/operators';
import { NodeActionMap, TreeNode } from './models/tree.model';
import { TreeService } from './services/tree.service';

@Component({
  selector: 'ces-tree',
  templateUrl: './ces-tree.component.html',
  styleUrls: ['./ces-tree.component.scss'],
})
export class CesTreeComponent implements OnInit, OnChanges, OnDestroy {

  @Input() treeHierarchy: TreeNode[] = [];

  @Input() showCheckbox = false;

  @Input() treeType: string;

  @Output() nodeExpand: EventEmitter<TreeNode> = new EventEmitter();

  @Output() nodeSelect: EventEmitter<TreeNode> = new EventEmitter();

  @Output() actionClick: EventEmitter<NodeActionMap> = new EventEmitter();

  public icExpand = faChevronRight;

  public icCollapse = faChevronDown;

  public icAdd = faPlus;

  public isMobile = false;

  public isActive = true;

  constructor(private _treeService: TreeService,
              private _sizeListener: WindowsSizeListenerService) {}
  

  ngOnInit(): void {
    this._subscribeReSizeEvent();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.treeHierarchy && this.treeHierarchy) {

      this.treeHierarchy = this._treeService.updateTree(this.treeHierarchy);

    }

  }

  ngOnDestroy(): void {
    this.isActive = false;
  }

  private _subscribeReSizeEvent(): void {

    this._sizeListener.getWindowSizeState().pipe(takeWhile(() => this.isActive)).subscribe((sizeObj) => {

      this.isMobile = sizeObj.isMobile;

    });

  }

  public toggleExpansion(node: TreeNode, emitEvent?: boolean): void{

    node.isExpanded = !node.isExpanded;

    if (emitEvent) {
      this.nodeExpand.emit(node);
    }

  }

  public createNewChildNode(parentNode: TreeNode): void {

  }

  public onNodeCheckChanged(event: any, node: TreeNode): void{

    this._treeService.updateNodeCheckStatus(event.target.checked, node);

  }

  public onNodeClick(node: TreeNode): void {

    this.nodeSelect.emit(node);

  }

}
