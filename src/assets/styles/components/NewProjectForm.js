import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%',
        display: 'block',
        paddingBottom: 25,
        "& div": {
            marginBottom: 5
        }
    },
    photoContainer: {
        display: 'flex',
        maxHeight: 250,
        maxWidth: 'auto',
        justifyContent: 'center',
        paddingBottom: 5,
        paddingTop: 10
    },
    submit: {
        float: 'right',
        width: '100%',
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center'
    },
    logo: {
        background: '#DEDEDE'
    },
    dateError: {
        "& fieldset": {
            borderColor: "#d32f2f"
        },
        "& label": {
            color: "#d32f2f"
        }
    },
    dateInfo: {
        "& p": {
            fontSize: '0.75rem'
        }
    },
    logoError: {
        textAlign: 'center',
        fontSize: 'small',
        color: 'red',
        marginBottom: -5
    }
}))