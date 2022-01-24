import { Button, FormControl, Alert, Input, InputLabel, Stack, Typography, Checkbox, FormControlLabel, Link } from '@mui/material'
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function TermsDialog(props) {
    const openDialog = () => {
        props.setDialogVisible(true);
    };
    const closeDialog = () => {
        props.setDialogVisible(false);
    };
    return(
        <div>
            <Dialog open={openDialog} onClose={closeDialog} scroll='paper' maxWidth='lg'>
                <DialogTitle>Terms of service</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText color='textPrimary'>
                        <p>
                            <strong>IMPORTANT - LEGAL NOTICE</strong>
                        </p>
                        <p>
                            <u>CONFIDENTIALITY NOT GUARANTEED</u> — Confidentiality of any financial transactions made using Creddi, your University of Alberta CCID, as well as your Creddi account
                            password cannot be guaranteed. Internet transmissions are vulnerable to interception, use, viruses and/or alteration by person(s) other than the intended recipient(s). Further,
                            transaction and account details may be subject to review by multiple persons involved with Creddi, including client University of Alberta clubs, as well as the University of Alberta
                            Computer Engineering Club.
                        </p>
                        <p>
                            <u>INFORMATION MAY NOT BE CORRECT</u> - Any information provided to you or your organization by Creddi and the University of Alberta Computer Engineering Club or its members in relation to financial
                            details is not guaranteed to be correct. We caution that all such persons providing this service are students and none are required to have any special expertise, designations or credentials in this
                            area. All such information is therefore provided without any representation or warranty, including without any representation of fitness for your purposes, and such information is not, and shall not
                            be construed as, information advice upon which you should rely.
                        </p>
                        <p>
                            <u>DISCLAIMER OF LIABILITY</u> – Accordingly, any communications or submissions between you, Creddi and the University of Alberta Computer Engineering Club and any of its members, and any reliance
                            by you on any information provided to you as aforesaid, shall be done at your sole risk. None of Creddi and the University of Alberta Computer Engineering Club, nor its members, shall be liable for
                            any damages or claims, whether direct, indirect, special, incidental, punitive or consequential, suffered by you or any other person relating to the information provided to you or the disclosure or
                            interception of any transmissions, submissions or communications by or to you.
                        </p>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TermsDialog;