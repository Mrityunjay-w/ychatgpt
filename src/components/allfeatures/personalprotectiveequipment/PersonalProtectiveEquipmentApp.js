import 'bootstrap/dist/css/bootstrap.min.css';
import PersonalProtectiveEquipmentHeader from "./PersonalProtectiveEquipmentHeader";
import PersonalProtectiveEquipmentMain from "./PersonalProtectiveEquipmentMain";
import PersonalProtectiveEquipmentFooter from "./PersonalProtectiveEquipmentFooter";


function PersonalProtectiveEquipmentApp() {
    return (
        <div className="App">
            <div>
                <PersonalProtectiveEquipmentHeader />
            </div>
            <div>
                <PersonalProtectiveEquipmentMain />
            </div>

            {/* <div className='bg-[#1f4e96] text-white p-6 py-4'>
                <PersonalProtectiveEquipmentFooter />
            </div> */}
            <div>
                <PersonalProtectiveEquipmentFooter />
            </div>
        </div>
    );
}

export default PersonalProtectiveEquipmentApp;
