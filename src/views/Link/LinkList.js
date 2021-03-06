import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List } from '@material-ui/core';
import { FirebaseContext } from '../../context';
import LinkItem from './LinkItem';

const useStyles = makeStyles(theme => ({
  root: {
    fontFamily: 'sans-serif',
    marginTop: 100
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

function LinkList(props) {
  const classes = useStyles();
  const { firebase } = React.useContext(FirebaseContext);
  const [links, setLinks] = React.useState(null);

  const getLinks = React.useCallback(() => {
    // onSnapShot can call a callback if its passed as an arg
    firebase.db.collection('links').onSnapshot(handleSnapshot);
  }, [firebase.db]);

  React.useEffect(() => {
    getLinks();
  }, [getLinks]);

  // the snapshot arg is a copy of our data >> snapshot.docs is an array
  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });

    setLinks(links);
  }

  function renderLinks(links) {
    return (
      <List>
        {links.map((link, index) => (
          <LinkItem key={link.id} {...link} count={index + 1} />
        ))}
      </List>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={3}>
        <Grid item xs={10}>
          {links ? renderLinks(links) : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default LinkList;
