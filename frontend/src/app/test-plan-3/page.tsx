'use client';

import React, { useMemo, useState } from 'react';
import { Table, Tbody, Thead, TableWrapper, TrHead, Th, TrBody, Td } from "@/components/table/Table";
const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
export default function Page() {
    return (
        <div className="bg-white rounded min-h-[calc(100vh-16rem)]">
            <div className="grid grid-cols-12">
                <div className="col-span-12 mt-3 px-3">
                    <TableWrapper overflow>
                        <Table>
                            <Thead>
                                <TrHead>
                                    <Th>STT</Th>
                                    <Th>Project Name</Th>
                                    <Th>Project Manager</Th>
                                </TrHead>
                            </Thead>
                            <Tbody>
                                <TrBody>
                                    <Td>1</Td>
                                    <Td>Project 1</Td>
                                    <Td>John Doe</Td>
                                </TrBody>
                            </Tbody>
                        </Table>
                    </TableWrapper>
                </div>
            </div>
        </div>
    )
}