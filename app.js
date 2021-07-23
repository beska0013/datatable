const URL = 'assets/fackeBackEnd/data.json';

const newCustomerArray = []

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
                '<label for= '+title+' >'+title+''+
                '<input id="'+title+'" type="text" placeholder="Search '+title+'"/>' +
                '<select></select>'+
                '</label>'
              );
            table.columns().every( function () {
                const column = this;
                $( 'input', this.header() ).on( 'keyup change', function () {
                    column.search( this.value ).draw();
                });
            });
        })
    selectSearch(table)
}






let id = 0;

function selectSearch(table){
    const columnsData = table.columns().data();
    const select = $('#myTable thead select');
    for (let i = 0; i < columnsData.length; i++) {
        let options = `<option value ='' selected></option>`
        for (let j = 0; j < columnsData[i].length; j++) {
            options += ` <option value= ${columnsData[i][j]}>${columnsData[i][j] }</option>`
        }
        console.log(table);
        select[i].innerHTML = options
    }
    table.columns().every(function () {
        const column = this;
        $("select", this.header()).on("change", function () {
            const val = $.fn.dataTable.util.escapeRegex($(this).val());
            column.search(val ? "^" + val + "$" : "", true, false).draw();
        });
    })
}


// function selectSearch(table){
//
//     const columnsData = table.columns().data();
//     const select = $('.checkboxes');
//     for (let i = 0; i < columnsData.length; i++) {
//         let options = `<option></option>`
//         for (let j = 0; j < columnsData[i].length; j++) {
//             options += ` <label for=${id++}>
//                         <input type="checkbox" id= ${id++ -1} value= ${columnsData[i][j]} />
//                          ${columnsData[i][j]}
//                         </label>`
//         }
//         select[i].innerHTML = options
//     }
//     table.columns().every(function () {
//
//
//
//
//     })
// }

//--load json--//
document.addEventListener('DOMContentLoaded',() => getData(URL))


