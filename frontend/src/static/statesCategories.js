export const stateCategory = {
  states: [
    {
      name: "Abia",
      cities: [
        "Aba North",
        "Aba South",
        "Arochukwu",
        "Bende",
        "Ikwuano",
        "Isiala Ngwa North",
        "Isiala Ngwa South",
        "Isiukwuato",
        "Obi Ngwa",
        "Ohafia",
        "Osisioma Ngwa",
        "Ugwunagbo",
        "Ukwa East",
        "Ukwa West",
        "Umuahia North",
        "Umuahia South",
        "Umunneochi",
      ],
    },
    {
      name: "Abuja",
      cities: [
        "Abaji",
        "Abuja Municipal",
        "Bwari",
        "Gwagwalada",
        "Kuje",
        "Kwali",   
      ],
    },
    
    {
      name: "Adamawa",
      cities: [
        "Demsa",
        "Fufore",
        "Ganye",
        "Girei",
        "Gombi",
        "Guyuk",
        "Hong",
        "Jada",
        "Lamurde",
        "Madagali",
        "Maiha",
        "Mayo-Belwa",
        "Michika",
        "Mubi North",
        "Mubi South",
        "Numan",
        "Shelleng",
        "Song",
        "Toungo",
        "Yola North",
        "Yola South",  
      ],
    },
    {
      name: "Akwa Ibom",
      cities: [
        "Abak",
        "Eastern Obolo",
        "Eket",
        "Esit Eket",
        "Essien Udim",
        "Etim Ekpo",
        "Etinan",
        "Ibeno",
        "Ibesikpo Asutan",
        "Ibiono Ibom",
        "Ika",
        "Ikono",
        "Ikot Abasi",
        "Ikot Ekpene",
        "Ini",
        "Itu",
        "Mbo",
        "Mkpat Enin",
        "Nsit Atai",
        "Nsit Ibom",
        "Nsit Ubium",
        "Obot Akara",
        "Okobo",
        "Onna",
        "Oron",
        "Oruk Anam",
        "Udung Uko",
        "Ukanafun",
        "Uruan",
        "Urue-Offong/Oruko",
        "Uyo",    
      ],
    },
    {
      name: "Anambra",
      cities: [
        "Aguata",
        "Anambra East",
        "Anambra West",
        "Anaocha",
        "Awka North",
        "Awka South",
        "Ayamelum",
        "Dunukofia",
        "Ekwusigo",
        "Idemili North",
        "Idemili South",
        "Ihiala",
        "Njikoka",
        "Nnewi North",
        "Nnewi South",
        "Ogbaru",
        "Onitsha North",
        "Onitsha South",
        "Orumba North",
        "Orumba South",
        "Oyi",    
      ],
    },
    {
      name: "",
      cities: [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",     
      ],
    },
  ],
};


// import React, { useState } from "react";
// import nigeriaData from "./nigeria-states-cities.json"; // Import the JSON file

// const AddressForm = () => {
//   // State variables to store selected state and city
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [availableCities, setAvailableCities] = useState([]);

//   // Handle state selection and update cities accordingly
//   const handleStateChange = (e) => {
//     const stateName = e.target.value;
//     setSelectedState(stateName);

//     // Find the selected state's cities from the JSON
//     const cities = nigeriaData.states.find(
//       (state) => state.name === stateName
//     )?.cities || [];

//     setAvailableCities(cities);
//   };

//   return (
//     <div>
//       {/* State Dropdown */}
//       <div>
//         <label htmlFor="state">Select State</label>
//         <select
//           id="state"
//           value={selectedState}
//           onChange={handleStateChange}
//           className="border p-2 rounded"
//         >
//           <option value="">-- Select a state --</option>
//           {nigeriaData.states.map((state) => (
//             <option key={state.name} value={state.name}>
//               {state.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* City Dropdown */}
//       {selectedState && (
//         <div>
//           <label htmlFor="city">Select City</label>
//           <select
//             id="city"
//             value={selectedCity}
//             onChange={(e) => setSelectedCity(e.target.value)}
//             className="border p-2 rounded"
//           >
//             <option value="">-- Select a city --</option>
//             {availableCities.map((city) => (
//               <option key={city} value={city}>
//                 {city}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddressForm;

