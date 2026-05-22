"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";

export function DeleteDialogue({ data }) {
    const { destinationName, _id } = data;
    const handleDeleteAction = async () => {
        const res = await fetch(`http://localhost:8000/destination/${_id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json",
            },
        });
        const deleted = await res.json();
        console.log(deleted)
    };
    return (
        <AlertDialog>
            <Button variant="danger">Delete</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete project permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{destinationName}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDeleteAction} slot="close" variant="danger">
                                Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}