import { Injectable } from '@angular/core';
import { TreeNode } from '../models/tree.model';

@Injectable()
export class TreeService {

  constructor() { }

  public updateTree(tree: TreeNode[]): TreeNode[] {

    const newTree = [...tree];

    return this._updateTreeRelations(newTree);

  }

  private _updateTreeRelations(tree: TreeNode[], parent?: TreeNode): TreeNode[] {

    const childrenCheckState = tree.reduce((checkSate, node) => {

      if (node.children && node.children.length) {

        this._updateTreeRelations(node.children, node);

      }

      node.parent = parent;

      if ((node.checkboxState === 'checked' || node.checkboxState === 'indeterminate')) {
        checkSate.isAllUnchecked = false;
      }
      
      if (node.checkboxState === 'unchecked' || node.checkboxState === 'indeterminate') {
        checkSate.isAllChecked = false;
      }

      return checkSate;

    }, {isAllChecked: true, isAllUnchecked: true});

    if (parent) {

      if (childrenCheckState.isAllUnchecked) {
        parent.checkboxState = 'unchecked';
      } else if (childrenCheckState.isAllChecked) {
        parent.checkboxState = 'checked';
      } else {
        parent.checkboxState = 'indeterminate';
      }

    }

    return tree;

  }

  public updateNodeCheckStatus(isChecked: boolean, node: TreeNode): void {

    const state = isChecked ? 'checked' : 'unchecked';

    node.checkboxState = state;

    this.updateParentNodeStatus(node);
    this.updateChildrenStatus(state, node);

  }

  public updateParentNodeStatus(node: TreeNode): void {

    if (!node.parent) {
      return;
    }

    const isAllChecked = node.parent.children.every(child => child.checkboxState === 'checked');
    const isAllUnchecked = node.parent.children.every(child => child.checkboxState === 'unchecked');

    if (isAllChecked) {
      node.parent.checkboxState = 'checked';
    } else if (isAllUnchecked) {
      node.parent.checkboxState = 'unchecked';
    } else {
      node.parent.checkboxState = 'indeterminate';
    }

    this.updateParentNodeStatus(node.parent)

  }

  public updateChildrenStatus(state: 'checked' | 'unchecked', node: TreeNode): void{

    if (node.children && node.children.length) {

      node.children.map(child => {

        child.checkboxState = state;
        this.updateChildrenStatus(state, child);

      });

    }

  }

}
