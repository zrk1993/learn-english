class PivotData {
  constructor(data, opts) {
    this.inputData = data;
    this.colAttrs = opts.colAttrs;
    this.rowAttrs = opts.rowAttrs;

    this.tree = {};
    this.colKeys = [];
    this.rowKeys = [];

    this.forEachRecord();
  }

  forEachRecord() {
    for (let i = 0, len = this.inputData.length; i < len; i ++) {
      let record = this.inputData[i];
      this.processRecord(record);
    }
  }

  processRecord(record) {
    const rowKey = [];
    const colKey = [];

    this.rowAttrs.forEach((rowAttr) => {
      record[rowAttr] && rowKey.push(record[rowAttr]);
    });

    this.colAttrs.forEach((colAttr) => {
      record[colAttr] && colKey.push(record[colAttr]);
    });

    const flatRowKey =  rowKey.join(' ');
    const flatColKey =  colKey.join(' ');

    if  (colKey.length && rowKey.length) {

      if (!this.colKeys[flatColKey]) {
        this.colKeys.push(colKey);
      }
      if (!this.rowKeys[flatRowKey]) {
        this.rowKeys.push(rowKey);
      }

      if (!this.tree[flatRowKey]) {
        this.tree[flatRowKey] = {};
      }

      if (!this.tree[flatRowKey][flatColKey]) {
        this.tree[flatRowKey][flatColKey] = new Leaf();
      }

      this.tree[flatRowKey][flatColKey].addRecord(record);
    }
  }

  sortColKeys() {
    this.colKeys = this.colKeys.sort(sortKeys);
  }

  sortRowKeys() {
    this.rowKeys = this.rowKeys.sort(sortKeys);
  }
}

class Leaf {
  constructor() {
    this.records = [];
  }

  addRecord(record) {
    this.records.push(record);
  }
}


function sortKeys(a, b) {
  if (a > b) {
    return 1;
  } else if (a < b) {
    return -1;
  } else {
    if (!a && !b) return 0;
    return sortKeys(a.replace(/^.*?\s/, ''), b.replace(/^.*?\s/, ''));
  }
}

function pivotTableRender(pivotData) {
  const colAttrs = pivotData.colAttrs;
  const rowAttrs = pivotData.rowAttrs;
  const colKeys = pivotData.colKeys;
  const rowKeys = pivotData.rowKeys;

  const pivotTable = document.createElement('table');

  const thead = document.createElement('thead');

  for (let iColAttrs = 0, lenColAttrs = colAttrs.length; iColAttrs < len; iColAttrs++) {
    
    const tr = document.createElement('tr');

    if (iColAttrs === 0 && rowAttrs.length) {
      const th = document.createElement('th');
      th.setAttribute('colspan', rowAttrs.length);
      th.setAttribute('rowspan', colAttrs.length);
      tr.appendChild(th);
    }

    const th = document.createElement('th');
    th.textContent = colAttrs[iColAttrs];
    tr.appendChild(th);

    for (let iColKeys = 0, lenColKeys = colKeys.length ; iColKeys < lenColKeys; i++) {
      const th = document.createElement('th');
      th.textContent = colKeys[lenColKeys][iColAttrs];

      tr.appendChild(th);
    }
  }

  return pivotTable;
}


(function () {

const data = [
  {
    name: 'A',
    agg: 1,
    area: '北京',
    color: 'red',
  },
  {
    name: 'B',
    agg: 2,
    area: '深圳',
    color: 'green',
  },
  {
    name: 'C',
    agg: 2,
    area: '厦门',
    color: 'red',
  },
  {
    name: 'D',
    agg: 3,
    area: '厦门',
    color: 'green',
  },
  {
    name: 'A',
    agg: 3,
    area: '广州',
    color: 'red',
  },
  {
    name: 'B',
    agg: 4,
    area: '北京',
    color: 'white',
  },
];

const opts = {
  colAttrs: ['agg'],
  rowAttrs: ['name', 'area'],
};

const pivotData = new PivotData(data, opts);

console.log(pivotData.tree);

const table = pivotTableRender(pivotData);

console.log(table);

}());


