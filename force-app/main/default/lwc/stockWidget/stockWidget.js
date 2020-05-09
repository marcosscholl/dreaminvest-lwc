import { LightningElement, wire } from 'lwc';
import stockUtils from 'c/stockUtils';
import getStockServiceApiKey from '@salesforce/apex/StockServiceController.getStockServiceApiKey';

export default class StockWidget extends LightningElement {
    @wire(getStockServiceApiKey)
    wiredApiKey({ error, data }) {
        if (error) {
            this.error = error;
            this.apiKey = undefined;
        } else if (data) {
            this.error = undefined;
            this.apiKey = data;
            this.stocks = [];
            this.row='';
        }
    }

    apiKey;
    error;
    stock;
    symbol;    
    stocks;
    row;
    table;

    getStock() {
        if (this.symbol && this.apiKey) {
            stockUtils
                .getStock(this.apiKey, this.symbol)
                .then((stock) => {
                    this.stock = stock;
                    this.stocks.push(stock);

                    this.row = null;
                    this.table = null;

                    
                    this.table = `<table class="slds-table slds-table_cell-buffer slds-table_bordered slds-table_col-bordered">
                    <thead>
                        <tr class="slds-line-height_reset">
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Symbol">SYMBOL</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Open">OPEN</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Price">PRICE</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="High">HIGH</div>
                            </th>
                            <th class="" scope="col">
                                <div class="slds-truncate" title="Confidence">LOW</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>`
                    

                    for (var i = 0; i < this.stocks.length; i++) {
                        console.log(this.stocks[i]);                        

                        //this.createRow(this.stocks[i]);
                        
                        this.table += `<tr class="slds-hint-parent">
                            <td data-label="Symbol">
                                <div class="slds-truncate" title=A>${this.stocks[i].symbol}</div>
                            </td>
                            <td data-label="Open">
                                <div class="slds-truncate" title=B>${this.stocks[i].open}</div>
                            </td>
                            <td data-label="Price">
                                <div class="slds-truncate" title=C>${this.stocks[i].price}</div>
                            </td>
                            <td data-label="High">
                                <div class="slds-truncate" title=D>${this.stocks[i].high}</div>
                            </td>
                            <td data-label="Low">
                                <div class="slds-truncate" title=E>${this.stocks[i].low}</div>
                            </td>                                
                        </tr>`;
                        
                    }
                      //this.createTable(this.row)
                    this.table += '</tbody></table>';

                             
                    
                })
                .catch((error) => {
                    this.error = error;
                });
        }
    }

    handleSymbolChange(event) {
        this.symbol = event.target.value;
        if (!this.symbol) {
            this.stock = null;
        }
    }

    createRow(stock) {
        this.row += `<tr class="slds-hint-parent">
                        <td data-label="Symbol">
                            <div class="slds-truncate" title=S>${stock.symbol}</div>
                        </td>
                        <td data-label="Open">
                            <div class="slds-truncate" title=O>${stock.open}</div>
                        </td>
                        <td data-label="Price">
                            <div class="slds-truncate" title=P>${stock.price}</div>
                        </td>
                        <td data-label="High">
                            <div class="slds-truncate" title=H>${stock.high}</div>
                        </td>
                        <td data-label="Low">
                            <div class="slds-truncate" title=L>${stock.low}</div>
                        </td>                                
                    </tr>`;
    }

    createTable(row){
        this.table = `<table class="slds-table slds-table_cell-buffer slds-table_bordered slds-table_col-bordered">
        <thead>
            <tr class="slds-line-height_reset">
                <th class="" scope="col">
                    <div class="slds-truncate" title="Symbol">SYMBOL</div>
                </th>
                <th class="" scope="col">
                    <div class="slds-truncate" title="Open">OPEN</div>
                </th>
                <th class="" scope="col">
                    <div class="slds-truncate" title="Price">PRICE</div>
                </th>
                <th class="" scope="col">
                    <div class="slds-truncate" title="High">HIGH</div>
                </th>
                <th class="" scope="col">
                    <div class="slds-truncate" title="Confidence">LOW</div>
                </th>
            </tr>
        </thead>
        <tbody>${row}</tbody>
        </table>`;
    }
}