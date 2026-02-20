"use client"

import IconArchive from "@/components/icons/icon-archive";
import IconList from "@/components/icons/icon-list";
import IconPlus from "@/components/icons/icon-plus";
import IconSearch from "@/components/icons/icon-search";
import IconShare from "@/components/icons/icon-share";
import { PolicyMaster } from "@/types/types";
import { policyMasterService } from "@/features/services/policy-master";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import ToggleSwitch from "@/components/input/ToggleSwitch";
import IconPencil from "@/components/icons/icon-pen";
import { ValidatePolicyMasterError } from "@/types/validate-types";

const defPolicy = [
    {
        id: 1,
        policy_code: "SD&SG",
        policy_name: "Strategic Direction & Sustainable Growth Policy",
        description: "นโยบายทิศทางกลยุทธ์และการเติบโตอย่างยั่งยืน",
        is_active: true,
    },
    {
        id: 2,
        policy_code: "PRM",
        policy_name: "Performance & Result-Oriented Management Policy",
        description: "นโยบายการบริหารจัดการที่มุ่งเน้นผลงาน",
        is_active: true,
    },
    {
        id: 3,
        policy_code: "PLS",
        policy_name: "People, Leadership & Successor Development Policy",
        description: "นโยบายบุคลากรและผู้นำ",
        is_active: true,
    },
    {
        id: 4,
        policy_code: "PE&CE",
        policy_name: "Process Excellence & Cost Efficiency Policy",
        description: "นโยบายการพัฒนากระบวนการและต้นทุน",
        is_active: true,
    },
    {
        id: 5,
        policy_code: "DT&TE",
        policy_name: "Digital Transformation & Technology Enablement Policy",
        description: "นโยบายดิจิทัลและเทคโนโลยี",
        is_active: true,
    },
    {
        id: 6,
        policy_code: "GRC",
        policy_name: "Governance, Risk & Compliance Policy",
        description: "นโยบายธรรมาภิบาลและการกำกับดูแล",
        is_active: true,
    },
    {
        id: 7,
        policy_code: "CSV",
        policy_name: "Customer & Stakeholder Value Policy",
        description: "นโยบายคุณค่าลูกค้าและผู้มีส่วนได้ส่วนเสีย",
        is_active: false,
    },
    {
        id: 8,
        policy_code: "EDA",
        policy_name: "Execution Discipline & Accountability Policy",
        description: "นโยบายวินัยการปฏิบัติและความรับผิดชอบ",
        is_active: false,
    },
]
export default function PolicyPage() {
    const [category, setCategory] = useState("All");
    const [isPolicyInfoModalOpen, setIsPolicyInfoModalOpen] = useState(false);
    const [policyList, setPolicyList] = useState<PolicyMaster[]>([]);
    const [policyInfo, setPolicyInfo] = useState<PolicyMaster>({
        id: null,
        policy_code: '',
        policy_name: '',
        description: '',
        is_active: true
    });
    const [validateFieldError, setvalidateFieldError] = useState<ValidatePolicyMasterError>({
        policy_code: {
            valid_status: true,
            errorText: ''
        },
        policy_name: {
            valid_status: true,
            errorText: ''
        }
    })

    

    const submitPolicyInfo = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("Submitted Policy Info:", policyInfo)
        setPolicyInfo({
            id: null,
            policy_code: '',
            policy_name: '',
            description: '',
            is_active: true
        })
        setIsPolicyInfoModalOpen(false);
    }

    const openPolicyInfoModal = (policyInfo: PolicyMaster | null) => {
        if (policyInfo) {
            setPolicyInfo(policyInfo);
        } else {
            setPolicyInfo({
                id: null,
                policy_code: '',
                policy_name: '',
                description: '',
                is_active: true
            })
        }
        setIsPolicyInfoModalOpen(true);
    };

    const closePolicyInfoModal = () => {
        setIsPolicyInfoModalOpen(false);
        setPolicyInfo({
            id: null,
            policy_code: '',
            policy_name: '',
            description: '',
            is_active: true
        })
    };

    async function GetAllPolicyList() {
        await policyMasterService.readAll().then((res) => setPolicyList(res.policy)).catch(() => (setPolicyList([])))
    }
    useEffect(() => {
        GetAllPolicyList()
    }, []);

    return (
        <div className="bg-white rounded p-3 min-h-[calc(100vh-5rem)]">
            <div className="border-b border-gray-200 pb-2">
                <h2 className="text-xl font-bold mb-2">Policy Master</h2>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex w-full max-w-xl items-center gap-2">
                        <button className="bg-[#F9FAFB] hover:bg-[#F3F4F6] rounded"><IconList className="h-6 w-6" size={24} /></button>
                        <div className="relative flex-1">
                            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
                                <IconSearch size={18} />
                            </span>
                            <input className="form-input pr-3 pl-10 " placeholder="Search" />
                        </div>
                        <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-2 text-sm">
                            <IconSearch size={18} />
                            <span className="ml-1">Search</span>
                        </button>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg px-3 py-2 text-sm" onClick={() => openPolicyInfoModal(null)}>
                        <IconPlus size={18} />
                        <span className="ml-1">Add New Master</span>
                    </button>
                </div>
            </div>
            <ul className="flex p-3 overflow-x-auto gap-3">
                <span>Show :</span>
                <div className="flex gap-5">
                    <div className="flex items-center">
                        <input className="cursor-pointer" type="radio" value="all" checked={category === "All"} onChange={() => setCategory("All")} id="all-category" />
                        <label className="pl-1 cursor-pointer" htmlFor="all-category">All</label>
                    </div>
                    <div className="flex items-center">
                        <input className="cursor-pointer" type="radio" value="active" checked={category === "Active"} onChange={() => setCategory("Active")} id="active-category" />
                        <label className="pl-1 cursor-pointer" htmlFor="active-category">Active</label>
                    </div>
                    <div className="flex items-center">
                        <input className="cursor-pointer" type="radio" value="inactive" checked={category === "Inactive"} onChange={() => setCategory("Inactive")} id="inactive-category" />
                        <label className="pl-1 cursor-pointer" htmlFor="inactive-category">Inactive</label>
                    </div>
                </div>
            </ul>
            {/* <ul className="flex pb-2 mt-3 overflow-x-auto">
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "All" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("All")}>All</button></li>
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "Active" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Active")}>Active</button></li>
                <li className="p-0.5"><button className={`rounded text-sm px-3 py-2 ${category === "Inactive" ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-gray-200 hover:bg-gray-300"} `} onClick={() => setCategory("Inactive")}>Inactive</button></li>
            </ul> */}
            <div className="table-wrapper">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Policy Code</th>
                            <th>Policy Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            policyList.map((policy, index) => (
                                <tr key={policy.id}>
                                    <td>{index + 1}.</td>
                                    <td>{policy.policy_code}</td>
                                    <td>{policy.policy_name}</td>
                                    <td>{policy.description}</td>
                                    <td>
                                        <div className="gap-1 flex">
                                            <button className="icon-button w-auto" onClick={() => { openPolicyInfoModal(policy) }}><IconPencil size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        {/* <tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr><tr><td>asd</td></tr> */}
                    </tbody>
                </table>
            </div>
            <Modal onClose={closePolicyInfoModal} isOpen={isPolicyInfoModalOpen} title="Policy Master Information">
                <form onSubmit={submitPolicyInfo} className="mt-4 space-y-3">
                    <div>
                        <label className="form-label">Code</label>
                        <input
                            type="text"
                            className="form-input"
                            value={policyInfo.policy_code}
                            onChange={(e) => setPolicyInfo({ ...policyInfo, policy_code: e.target.value })}
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-input"
                            value={policyInfo.policy_name}
                            onChange={(e) => setPolicyInfo({ ...policyInfo, policy_name: e.target.value })}
                            autoFocus
                        />
                    </div>
                    <div>
                        <label className="form-label">Description</label>
                        <textarea className="form-input" rows={2} value={policyInfo.description} onChange={(e) => setPolicyInfo({ ...policyInfo, description: e.target.value })} />
                    </div>
                    <div>
                        <ToggleSwitch checked={policyInfo.is_active} checked_label="Active" unchecked_label="Inactive" onChange={() => setPolicyInfo({ ...policyInfo, is_active: !policyInfo.is_active })} />
                    </div>
                    {/* <div className="mt-4 flex justify-end gap-2">

                    </div> */}
                </form>
                <div className="flex items-center justify-end pt-2 mt-2 border-t border-gray-300 gap-2">
                    <div>
                        <button
                            type="button"
                            onClick={closePolicyInfoModal}
                            className="secondary-button"
                        >
                            Close
                        </button>
                    </div>
                    <div>

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}