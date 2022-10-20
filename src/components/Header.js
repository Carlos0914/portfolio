import { useStyles } from '../assets/styles/components/Header'

const Header = () => {

    const classes = useStyles();

    return <div className={classes.header}>
        Portfolio
    </div>
}

export default Header;