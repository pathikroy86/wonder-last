"use client";

import { AlertDialog, Button } from "@heroui/react";

export function CancelConfirmation({ booking }) {
    const bookingId = booking._id;
    const handleCancel = async () => {
        const res = await fetch(`http://localhost:8000/booking/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await res.json();
    }
    return (
        <AlertDialog>
            <Button variant="danger">Cancel</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Cancel Tour Plan permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{booking.destinationName}</strong> booking and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleCancel} slot="close" variant="danger">
                                Confirm
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}