// axios.defaults.baseURL='https://api.nexcarry.com/api/v1/';
axios.defaults.baseURL = "http://localhost:5001/api/v1/";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });


let checkoutForm = document.getElementById("checkout-form")

if (checkoutForm) {
    checkoutForm.addEventListener("submit" , (e)=>{
        e.preventDefault()
        let full_name = checkoutForm.full_name.value
        let Email = checkoutForm.Email.value
        let Phone = checkoutForm.Phone.value
        let distance = checkoutForm.distance.value
        let freightType = checkoutForm.freightType.value
        let load = checkoutForm.load.value
        let fromAddress = checkoutForm.fromAddress.value
        let fromCity = checkoutForm.fromCity.value
        let fromState = checkoutForm.fromState.value
        let fromZip = checkoutForm.fromZip.value
        let toAddress = checkoutForm.toAddress.value
        let toCity = checkoutForm.toCity.value
        let toState = checkoutForm.toState.value
        let toZip = checkoutForm.toZip.value

        const data = {
            full_name, Email, Phone, distance, freightType, load, fromAddress, fromCity, fromState, fromZip, toAddress, toCity, toZip, toState
        }

        axios({
            method:"post",
            url:"/shipment/createShipment",
            data:{
                shipmentDetails:data,
            }
        })
        .then((res)=>{
            Toast.fire({
                icon:"success",
                title:"Shipment submitted for review by the admin, and you will receive your tracking number."
            })
            .then(()=>{
                window.location.reload()
            })
        })
        .catch((err)=>{
            Toast.fire({
                icon:"error",
                title:"Error occured"
            })
            .then(()=>{
                window.location.reload()
            })
        })
    })
}


let trackingForm = document.getElementById("trackingForm")

if (trackingForm) {
    const urlParams = new URLSearchParams(window.location.search);
  
    // Get a specific parameter value
    const id = urlParams.get("id");

    trackingForm.addEventListener("submit", (e)=>{
        e.preventDefault()

        let trackingNumber = trackingForm.trackingNumber.value

        axios({
            url:"/shipment/getSingleShipmentByTracking/"+trackingNumber,
            method:"get"
        }).then((res)=>{
            console.log(res)
            Toast.fire({
                icon:"success",
                title:"Shipment Found"
            })
            window.location.replace("./shipment-details.html?id="+res.data._id)
            
        }).catch((err)=>{
            console.log(err)
        })
    })
}

let bookingDetails = document.getElementById("bookingDetails")
    const urlParams = new URLSearchParams(window.location.search);
  
    // Get a specific parameter value
    const id = urlParams.get("id");
if (bookingDetails) {
    axios({
        url:"/shipment/getSingleShipmentById/"+id,
        method:"get"
    })
    .then((res)=>{
        console.log(res)
        bookingDetails.innerHTML=`
        <div>
                  <h5 style='color:#fff' >Track Shipment</h5>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="shipmentNumber" class="form-label">Tracking Number</label>
                    <input type="text" class="form-control" id="shipmentNumber" value="${res.data.trackingNumber}" readonly>
                  </div>
                  <div class="mb-3">
                    <label for="deliveryAddress" class="form-label">Delivery Address</label>
                    <div class="" id="deliveryAddress"   
           rows="3" readonly style='color: #000; background-color: #ddd; padding: 10px 5px'>
                      From: ${res.data.shipmentDetails.fromAddress}, ${res.data.shipmentDetails.fromCity}, ${res.data.shipmentDetails.fromState}, ${res.data.shipmentDetails.fromZip}<br><hr>
                      To: ${res.data.shipmentDetails.toAddress}, ${res.data.shipmentDetails.toCity}, ${res.data.shipmentDetails.toState}, ${res.data.shipmentDetails.toZip}
                    </div>
                  </div>
                 
                </div>`

                let htmlTemp1 = `<h6 class="mb-0 pt-5 bolder text-white">Tracking log</h6>`
            res.data.shipmentLogs.map((itm,index)=>{
              htmlTemp1 +=`
              <div class='py-1 '>
                   <li class="list-group-item  shadow p-2">
							<strong>${itm.status}</strong><br/>
							<span class="badge bg-success">${itm.location}</span><br/>
              <span class="badge bg-success">${itm.timestamp.split("T")[0]} - ${itm.timestamp.split("T")[1].split(".")[0] }</span>
						  </li>
              </div>
  `
            })
            bookingDetails.innerHTML+=htmlTemp1

    })
    .catch((err)=>{
        Toast.fire({
            icon:"warning",
            title:"Tracking number not provided"
        }).then(()=>{
            console.log(err)
            // window.location.replace("/")
        })
    })
   
}


let quoteform = document.getElementById("quoteform")

if (quoteform) {
    quoteform.addEventListener("submit", (e)=>{
        e.preventDefault()

        Toast.fire({
            icon:"info",
            title: "Not available, Feature coming soon."
        })
    })
}