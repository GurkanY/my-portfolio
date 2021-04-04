import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Code, ExternalLink, Image, X } from 'react-feather';
import { Box, Dialog, DialogProps, makeStyles, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { Button } from '@/components/Button';
import { IconButton } from '@/components/IconButton';
import { Tag } from '@/components/Tag';

import type { PortfolioProjectDialogVariantProps } from './PortfolioProjectDialog.types';

const CONTROLS_TOP_SPACE = 16;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    overflowY: 'auto',

    '& .MuiDialog-paper': { overflowY: 'inherit' },

    '& .MuiBackdrop-root': { backgroundColor: fade(theme.palette.text.primary, 0.8) },

    '& .MuiPaper-rounded': { borderRadius: 16, margin: theme.spacing(4, 8) },

    '&::-webkit-scrollbar': { width: '0.5em' },

    '&::-webkit-scrollbar-thumb': { backgroundColor: fade(theme.palette.text.primary, 0.8) },

    '& .MuiDialog-container': { height: 'auto' },
  },
  controls: {
    position: 'absolute',
    right: -60,
    transition: 'transform 0.3s',
  },
  tags: {
    display: 'flex',
    justifyContent: 'start',
    flexWrap: 'wrap',
    padding: theme.spacing(0, 3, 3, 3),
    '& > *': {
      margin: theme.spacing(0.5, 1, 0.5, 0),
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'normal',
    margin: theme.spacing(1, 1, 1, 0),
  },
  img: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
    height: 'auto',
  },
  headerTitle: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    marginBottom: theme.spacing(0.5),
  },
  headerContent: { marginTop: theme.spacing(1.5) },
  content: { paddingRight: theme.spacing(3), paddingLeft: theme.spacing(3) },
  contentMain: { padding: theme.spacing(3, 3, 1.5, 3) },
}));

export const PortfolioProjectDialogDesktop = (props: PortfolioProjectDialogVariantProps) => {
  const classes = useStyles();
  const [dialogScroll, setDialogScroll] = useState(0);

  const controlsTransform = `translateY(${Math.max(dialogScroll - CONTROLS_TOP_SPACE, 0)}px)`;

  const handleScroll: DialogProps['onScroll'] = (e) => {
    setDialogScroll((e.target as HTMLElement).scrollTop);
  };

  return (
    <Box display="inline-block">
      <Dialog className={classes.wrapper} open={props.isOpen} onClose={props.handleClose} onScroll={handleScroll}>
        <Box className={classes.controls} style={{ transform: controlsTransform }}>
          <Box mb={5}>
            <IconButton onClick={props.handleClose} size="small">
              <X size={30} />
            </IconButton>
          </Box>
          <Box mb={2.5}>
            <IconButton onClick={props.handlePrev} size="small">
              <ChevronLeft size={30} />
            </IconButton>
          </Box>
          <IconButton onClick={props.handleNext} size="small">
            <ChevronRight size={30} />
          </IconButton>
        </Box>
        <img className={classes.img} src={props.imgurl} alt={props.title} />
        <Box bgcolor="background.light" p={4}>
          <Box className={classes.headerTitle}>
            <Typography variant="h2" color="textPrimary">
              {props.title}
            </Typography>
            <Tag label={props.tagtitle} color="default" />
          </Box>
          <Typography variant="subtitle2" color="textPrimary">
            {props.subtitle}
          </Typography>
          <Typography className={classes.headerContent} variant="body1" color="textSecondary">
            {props.contentHeader}
          </Typography>
          <Box display="flex">
            {props.codeUrl ? (
              <Button
                href={props.codeUrl}
                className={classes.button}
                color="primary"
                variant="contained"
                startIcon={<Code size={16} />}
              >
                See code
              </Button>
            ) : null}
            {props.mockupsUrl ? (
              <Button
                href={props.mockupsUrl}
                className={classes.button}
                color="primary"
                variant="contained"
                startIcon={<Image size={16} />}
              >
                See mockups
              </Button>
            ) : null}
            {props.projectUrl ? (
              <Button
                href={props.projectUrl}
                className={classes.button}
                color="primary"
                variant="contained"
                startIcon={<ExternalLink size={16} />}
              >
                Open the app
              </Button>
            ) : null}
          </Box>
        </Box>
        <Typography className={classes.contentMain} variant="h5" color="textPrimary">
          Project description
        </Typography>
        <Typography
          className={classes.content}
          variant="body2"
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: props.contentMainDescription }}
        />
        <Typography className={classes.contentMain} variant="h5" color="textPrimary">
          My role
        </Typography>
        <Typography
          className={classes.content}
          variant="body2"
          color="textSecondary"
          dangerouslySetInnerHTML={{ __html: props.contentMainRole }}
        />
        <Typography className={classes.contentMain} variant="h5" color="textPrimary">
          Technologies
        </Typography>
        <Box className={classes.tags}>
          {props.tags.map((tag) => (
            <Tag key={tag.name} label={tag.name} />
          ))}
        </Box>
      </Dialog>
    </Box>
  );
};
