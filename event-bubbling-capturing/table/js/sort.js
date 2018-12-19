'use strict';

function handleTableClick(event) {
    if (event.target.tagName !== 'TH') {
        return;
    }
    event.target.dataset.dir = (event.target.dataset.dir < 0 || !event.target.dataset.dir) ? 1 : -1;
    event.currentTarget.dataset.sortBy = event.target.dataset.propName;
    
    sortTable(event.currentTarget.dataset.sortBy, event.target.dataset.dir);
}
