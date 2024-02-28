const loadPhone = async (searchText, showAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phone = data.data;
    displayPhone(phone, showAll);
}

const displayPhone = (phone, showAll) => {
    //step-01: get element by ID
    const phoneContainer = document.getElementById('phone-container');
    //clear container after search
    phoneContainer.textContent = '';
    
    const showAllContainer = document.getElementById('show-all-container');
    //show all btn if phone greater than 12
    if(phone.length>12){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    // display only 12 phone
    if(!showAll){
        phone = phone.slice(0,12);
    }

    phone.forEach(element => {
        console.log(element);
        //step-02: create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-base-100 shadow-xl`;
        //step-03: Set InnerHTML
        phoneCard.innerHTML = `
            <figure><img src="${element.image}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${element.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="showDetails('${element.slug}')" class="btn btn-primary">Show Details</button>
                </div>
            </div>
        `;
        //step-04: Append Child
        phoneContainer.appendChild(phoneCard);
    });
    loadingSpinner(false);
}

//show details

const showDetails = async (id) =>{
    // console.log("clicked", id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    console.log(phone);

    const phoneName = document.getElementById('show-phone-name');
    phoneName.innerText = phone.name;
    const showPhoneExtraDetail = document.getElementById('show-details-container');
    showPhoneExtraDetail.innerHTML = `
        <img src="${phone.image}"/>
        <p class="mt-3"><span>Storage: ${phone.mainFeatures.storage} </span></p>
        <p class="mt-3"><span>Chipset: ${phone?.mainFeatures?.chipSet} </span></p>
        <p class="mt-3"><span>Display Size: ${phone.mainFeatures.displaySize} </span></p>
        <p class="mt-3"><span>GPS: ${phone?.others?.GPS} </span></p>
    `;

    displayPhoneDetails(phone);
}

//display phone Details

const displayPhoneDetails = (phone) =>{
    myModal.showModal();
}

//for search button

const searchHandle = (showAll) => {
    loadingSpinner(true);
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    loadPhone(inputText, showAll);
}

const loadingSpinner = (isLoading) =>{
    const loadingSpinnerContainer = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinnerContainer.classList.remove('hidden');
    }
    else{
        loadingSpinnerContainer.classList.add('hidden');
    }
}

//function for show all

const showAll = () =>{
    searchHandle(true);
}

// loadPhone();