'use client'
import Input from "@/components/input/Input"
import Label from "@/components/input/Label"
import { useEffect, useState } from "react"
type OrgTree = {
    id: number;
    org_code: string;
    org_name: string;
    org_level: number;
    parent_org_id: number | null;
    path: string;

}
type OrgNode = OrgTree & { children: OrgNode[] };

function buildOrgTree(list: OrgTree[]): OrgNode[] {
    const map = new Map<number, OrgNode>();
    const roots: OrgNode[] = [];

    // create nodes
    for (const item of list) {
        map.set(item.id, { ...item, children: [] });
    }

    // connect parent -> child
    for (const item of list) {
        const node = map.get(item.id)!;
        if (item.parent_org_id === null || !map.has(item.parent_org_id)) {
            roots.push(node);
        } else {
            map.get(item.parent_org_id)!.children.push(node);
        }
    }

    // optional: sort for stable display
    const sortRec = (nodes: OrgNode[]) => {
        nodes.sort((a, b) => a.id - b.id);
        nodes.forEach((n) => sortRec(n.children));
    };
    sortRec(roots);

    return roots;
}

function OrgTreeRender({
    nodes,
    indent = 0,
}: {
    nodes: OrgNode[];
    indent?: number;
}) {
    return (
        <>
            {nodes.map((n) => (
                <div key={n.id}>
                    <div style={{ marginLeft: `${indent}rem` }}>
                        ({n.org_code}) - {n.org_name} ({n.path})
                    </div>

                    {n.children.length > 0 && (
                        <OrgTreeRender nodes={n.children} indent={indent + 2} />
                    )}
                </div>
            ))}
        </>
    );
}


export default function Page() {
    const [runningNumber, setrunningNumber] = useState<number>(0)
    const [lvSelected, setlvSelected] = useState<number>(1)
    const [orgCode, setorgCode] = useState<string>("")
    const [orgName, setorgName] = useState<string>("")
    const [parentId, setparentId] = useState<number | null>(null)
    const [parentPath, setparentPath] = useState<string>("")
    const organization_structure_level = [
        {
            id: 1,
            org_level_name: 'Company',
            level: 1
        },
        {
            id: 2,
            org_level_name: 'Business',
            level: 2
        },
        {
            id: 3,
            org_level_name: 'Division',
            level: 3
        },
        {
            id: 4,
            org_level_name: 'Department',
            level: 4
        },
        {
            id: 5,
            org_level_name: 'Section',
            level: 5
        }
    ]
    const [orgTree, setorgTree] = useState<OrgTree[]>([])
    function createTree() {
        const id = runningNumber;
        const newNode: OrgTree = {
            id,
            org_code: orgCode.trim(),
            org_name: orgName.trim(),
            org_level: lvSelected,
            parent_org_id: parentId,
            path: parentPath ? `${parentPath}/${id}` : `${id}`,
        };

        setorgTree(prev => [...prev, newNode]);
        setrunningNumber(prev => prev + 1);
    }
    useEffect(() => {
        console.log(orgTree, "orgTree");
    }, [orgTree])
    return (
        <>
            <div className="grid grid-cols-12">
                <div className="col-span-2 mt-3 px-3">
                    <Label title="orgCode" htmlFor="orgCode" require />
                    <Input
                        id="orgCode"
                        value={orgCode}
                        onChange={(e) => { setorgCode(e.target.value) }} />
                </div>
                <div className="col-span-2 mt-3 px-3">
                    <Label title="orgName" htmlFor="orgName" require />
                    <Input
                        id="orgName"
                        value={orgName}
                        onChange={(e) => { setorgName(e.target.value) }} />
                </div>
                <div className="col-span-2 mt-3 px-3">
                    <select value={lvSelected} onChange={(e) => setlvSelected(Number(e.target.value))}>
                        {organization_structure_level.map(lv => (
                            <option key={lv.id} value={lv.id}>{lv.org_level_name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-span-2 mt-3 px-3">
                    <Label title="parent_org_id" htmlFor="parent_org_id" require />
                    <select
                        value={parentId ?? ""}
                        onChange={(e) => {
                            const id = e.target.value === "" ? null : Number(e.target.value);
                            setparentId(id);
                            const node = orgTree.find(x => x.id === id);
                            setparentPath(node?.path ?? "");
                        }}
                    >
                        <option value="">null</option>
                        {orgTree.map(tree => (
                            <option key={tree.id} value={tree.id}>{tree.org_name}</option>
                        ))}
                    </select>

                </div>
                <div className="col-span-2 mt-3 px-3">
                    <button className="primary-button" onClick={() => { createTree() }}>create</button>
                </div>
            </div>
            Organization Tree
            <div className="">
                <OrgTreeRender nodes={buildOrgTree(orgTree)} />
            </div>
            {/* <div className="">
                {orgTree.map((org, index) => (
                    <div key={`${org.id}-${index}`} style={{ marginLeft: `${org.org_level * 2}rem` }}>({org.org_code}) - {org.org_name} ({org.path})</div>
                ))}
            </div> */}
        </>
    )
}