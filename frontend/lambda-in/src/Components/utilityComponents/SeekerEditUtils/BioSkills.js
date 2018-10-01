import React, { Fragment } from 'react';
import DropDown from '../DropDown/DropDown';
import TextField from '@material-ui/core/TextField';
import MapChips from '../MapArrays/MapChips';

const BioSkills = props => {
  const { userInfo } = props;

  return (
    <Fragment>
      <DropDown header="tell us something about yourself!">
        <div className="inputFieldLargeMultiline">
          <TextField
            id="summary"
            label="Your Bio"
            fullWidth
            multiline
            rowsMax="4"
            value={userInfo.summary}
            margin="normal"
            variant="outlined"
          />
        </div>
        {/* TODO */}
        <div className="inputFieldLargeMultiline">
          <TextField
            id="topSkills"
            label="Top skills"
            fullWidth
            multiline
            rowsMax="4"
            value={userInfo.topSkills}
            margin="normal"
            variant="outlined"
          />
        </div>
        {/* <MapChips getGS={props.getGS} setGS={props.setGS} field="topSkills" array={userInfo.topSkills} /> */}

        {/* TODO: Add summary - enable uploading a file */}
      </DropDown>
    </Fragment>
  );
};

export default BioSkills;
