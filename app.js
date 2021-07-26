const URL = 'assets/fackeBackEnd/data.json';
const newCustomerArray = []
let searchingArray = [];
let regex = '';
let columnNum = 0;
let id = 15;




//--get data--//
async function getData(url){
    try{
        const response = await  fetch(url);
        const responseObject = await response.json()
        //creating new object func//
        objectCreate(responseObject)
    }
    catch(err) {console.log(err);}
}

//html fixies//
function htmlFunc(){
    const header = document.createElement('header')
    const footer = document.createElement('footer')
    const dataTableWrapper = document.getElementById('myTable_wrapper');
    const dataTableLength = document.getElementById('myTable_length');
    const dataTableFilter = document.getElementById('myTable_filter');
    const dataTablePaginate = document.getElementById('myTable_paginate');
    const dataTableInfo = document.getElementById('myTable_info');
    header.append(dataTableLength)
    header.append(dataTableFilter )
    footer.classList.add('dataTables_wrapper')
    footer.append(dataTableInfo )
    footer.append(dataTablePaginate)
    dataTableWrapper.prepend(header)
    document.body.append(footer)
}

let idThead = 0
//--new array creator--//
function objectCreate(object){
    for(let key in object) {
        for(let i = 0; i < object[key].length; i++){
            newCustomerArray.push(
                [
                    object.id[i],
                    object.customer_id[i],
                    object.staff_group_id[i],
                    object.realization_id[i],
                    object.payment_amount[i],
                    object.payment_course[i],
                    object.payment_date[i],
                    object.real_payment[i],
                    object.graphic_date[i],
                    object.valuta[i],
                    object.valuta_course[i],
                    object.purpose[i],
                    object.doc_num[i]
                ]);
        }
        break;
    }
    renderCustomer(newCustomerArray)
}

//--render in columns--//
function renderCustomer(array) {
    //--render data--//
    const table = $('#myTable').DataTable({
        regex:true,
        data: array,
        columns:[
            {title:'Id'},
            {title:'Customer Id'},
            {title:'Staff Group Id'},
            {title:'Realization Id'},
            {title:'Payment Amount'},
            {title:'Payment Course'},
            {title:'Payment Date'},
            {title:'Real Payment'},
            {title:'Graphic Date'},
            {title:'Valuta'},
            {title:'Valuta Course'},
            {title:'Purpose'},
            {title:'Doc Num'},
        ],
    });
    $('#myTable thead th').each( function () {

        const title = $('#myTable thead th').eq( $(this).index() ).text();
        $(this).html(
            '<div class="wrapper">' +
            '<label for= '+title+' >'+title+''+
            '<input id="'+title+'" type="text" placeholder="Search '+title+'"/>'+
            '</label>' +
            '<form>' +
            '  <div class="multiselect">' +
            '    <div class="selectBox" >' +
            '      <select>\n' +
            '        <option> </option>' +
            '      </select>' +
            '      <div id = '+idThead +' class="overSelect"  onclick="showCheckboxes(event)"></div>' +
            '    </div>' +
            '    <div class="checkboxes">' +
            '    </div>\n' +
            '  </div>\n' +
            '</form>' +
            '</div>'
        );
        table.columns().every( function () {
            const column = this;
            $( 'input', this.header() ).on( 'keyup change', function () {
                column.search( this.value ).draw();
            });
        });
        idThead++
    })
    selectSearch(table)
    htmlFunc()

}

const showCheckboxes = e =>{
    columnNum = e.target.id
    regex = ''
    searchingArray = []
    e.target.parentNode.parentNode.children[1].classList.toggle('open');
}

function selectSearch(table){
    let columnId = 0
    const columnsData = table.columns().data();
    const checkboxes = $('.checkboxes');
    for (let i = 0; i < columnsData.length; i++) {
        let checkedInputs = ``
        for (let j = 0; j < columnsData[i].length; j++) {
            checkedInputs += ` 
                        <label for=${id++}>
                        <input type="checkbox" id= ${id++ -1} value= ${columnsData[i][j]} />
                         ${columnsData[i][j]}
                        </label>`
        }

        checkboxes[i].innerHTML = checkedInputs
    }
    const checkBox = $('input[type = checkbox]');
    checkBox.each(function(){
        $(this).on('keyup change',function(e){
            columnId = e.target.parentNode.parentNode.previousElementSibling.children[1].id
            regex = ''
            if(this.checked){
                searchingArray.push($(this).val())
                for (let i = 0; i < searchingArray.length ; i++) {
                    i >= 1 ?  regex += "|"+searchingArray[i] : regex += searchingArray[i];
                }
                $(e.target.form[0][0]).text($(this).val()).val()
                table.column(columnId).every(function () {
                    const column = this;
                    column.search(regex,true,false).draw();
                })
            }
            else  {
                let index  = searchingArray.indexOf($(this).val())
                $(e.target.form[0][0]).text(' ').val()
                searchingArray.length > 0 ? searchingArray.splice(index,1):null;
                table.column(columnId).every(function () {
                    const column = this;
                    column.search('').draw();
                })
            }
        })
    })
}

//--load json--//
document.addEventListener('DOMContentLoaded',() => getData(URL))


