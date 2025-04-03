import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LuChevronLeft } from 'react-icons/lu';

import { useOrder, useReturnOrder, useUpdateReturnOrder } from '@vestido-ecommerce/orders/client';
import {
    Card,
    CardContent, CardTitle
} from '@vestido-ecommerce/shadcn-ui/card';
import {
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@vestido-ecommerce/shadcn-ui/table';

import { formattedDate, formattedTime } from '../orders/OrdersTable';
import ItemInReturnOrderDetails from './item-in-return-order';
import { Button } from '@vestido-ecommerce/shadcn-ui/button';

type returnDetailsProps = {
    returnId: string;
};

const ReturnDetails: React.FC<returnDetailsProps> = ({ returnId }) => {
    const router = useRouter();
    const {trigger} = useUpdateReturnOrder()

    const { data } = useReturnOrder(returnId);
    const [refunded, setRefunded] = useState(false);
    const returnOrder = data?.data;
    const cod = returnOrder?.order?.payments[0].paymentGateway === 'CASH_ON_DELIVERY';

    const { data: replacementOrder } = useOrder(returnOrder?.replacementOrderId);

    const handleUpdate = async () => {
        try {
            await trigger({ returnId, status: "REFUNDED" });
            setRefunded(true);
        } catch (error) {
            console.error("Failed to update refund status", error);
        }
    };
    return (
        <>
            <div
                onClick={() => router.back()}
                className="flex gap-1 items-center mt-12 mb-4 ml-4 cursor-pointer"
            >
                <LuChevronLeft />
                Back
            </div>
            <div className="flex flex-col justify-center w-full text-lg mt-16 bg-slate-200 px-5 py-10 mb-5">
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-semibold capitalize flex justify-between">
                            Return # {returnOrder?.return_no.toString()}
                        </div>
                        <Link
                            href={`/orders/${returnOrder?.orderId}`}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            {returnOrder?.type === "REPLACE" ? 'Exchanged' : 'Returned'} from Order #{returnOrder?.order.order_no.toString()}

                        </Link>
                        <Link href={`/orders/${returnOrder?.replacementOrderId}`} className="text-sm text-blue-600 hover:underline"> {returnOrder?.type === "REPLACE" &&
                            <div>New Order Placed : Order #{replacementOrder?.data?.order_no.toString()}</div>}</Link>
                    </div>
                </div>
                <div className="grid grid-cols-6 gap-3">

                    <Card className="col-span-6 mt-3">
                        <CardTitle className="text-xl p-3 font-normal ">
                            <div className="flex justify-between">
                                <div> {returnOrder?.type === "REPLACE" ? 'Exchange' : 'Return'} # {returnOrder?.return_no.toString()}</div>
                                <div className="text-base flex divide-x gap-5">
                                    <div>
                                        {returnOrder &&
                                            formattedDate(new Date(returnOrder.createdAt))}
                                    </div>
                                    <div>
                                        {returnOrder &&
                                            formattedTime(new Date(returnOrder.createdAt))}
                                    </div>
                                </div>
                            </div>
                        </CardTitle>
                        <CardContent className="text-sm gap-4 grid grid-cols-3 max-w-xl">
                            <div className="">Return Status </div>
                            <div className="font-semibold col-span-2">
                                {returnOrder?.status}
                            </div>
                            <div className="">Refund Amount:</div>
                            <div className="font-semibold col-span-2">
                                {returnOrder?.refundAmount}
                            </div>
                            <div className="">Type</div>
                            <div className="font-semibold col-span-2">
                                {returnOrder?.type}
                            </div>
                            <div>Original Payment :</div>
                            <div className="font-semibold col-span-2">
                                {cod ? 'Cash on Delivery' : 'Online'}
                            </div>
                        </CardContent>
                    </Card>
                    {cod ?
                        <Card className='relative col-span-6'>
                            <Button disabled={refunded} onClick={() => handleUpdate()} className={`absolute top-3 right-3 disabled:opacity-100 ${refunded ? 'bg-green-400 text-white': ''}`}>{refunded ? 'Refunded' : 'Mark as Refunded'}</Button>
                            <div className="p-4 text-lg font-semibold">Bank Details</div>
                            <CardContent className='grid grid-cols-4 text-sm gap-4'>
                                <div className='justify-self-end'>Account Holder Name:</div>
                                <span className='font-semibold col-span-3'>{returnOrder.bankDetails.map((x) => x.accountHolderName)}</span>
                                <div className='justify-self-end'>Account Number:</div>
                                <span className='font-semibold col-span-3'>{returnOrder.bankDetails.map((x) => x.accountNumber)}</span>
                                <div className='justify-self-end'>IFSC Code:</div>
                                <span className='font-semibold col-span-3'>{returnOrder.bankDetails.map((x) => x.ifscCode)}</span>
                                <div className='justify-self-end'>Mobile:</div>
                                <span className='font-semibold col-span-3'>{returnOrder.bankDetails.map((x) => x.mobile)}</span>
                            </CardContent>
                        </Card> : ''}

                    <div className="bg-white col-span-6">
                        <div className="p-4 text-lg font-semibold">{returnOrder?.type === "REPLACE" ? 'Exchange' : 'Return'} Items</div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Return Qty</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Size</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {returnOrder?.returnItems?.map((returnItem, index) => (
                                    <ItemInReturnOrderDetails
                                        returnItem={returnItem}
                                        key={index}
                                    />
                                ))}
                            </TableBody>
                            <TableFooter></TableFooter>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReturnDetails;
