import Button from '@mui/material/Button';
import React, { useRef }  from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField'
import Cookies from 'js-cookie';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Dashboard() {
  const [projList, setProjList] = React.useState([]);
  const [selectedImg, setSelectedImg] = React.useState('');
  const [selectedIdx, setSelectedIdx] = React.useState(0);
  const [isResultReady, setResultReady] = React.useState(false);
  const [imgDim, setImgDim] = React.useState({width: 330, height: 330});
  const [selectedBeginFile, setSelectedBeginFile] = React.useState(null);
  const [selectedEndFile, setSelectedEndFile] = React.useState(null);
  const [uploadStatus, setUploadStatus] = React.useState('');
  const [text, setText] = React.useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  
  const handleEndFileChange = (event) => {
    setSelectedEndFile(event.target.files[0]);
    setUploadStatus('');
  }

  const handleBeginFileChange = (event) => {
    setSelectedBeginFile(event.target.files[0]);
    setUploadStatus('');
  }

  const handleUpload = async () => {
    if (!selectedBeginFile || !selectedEndFile) {
      setUploadStatus('Please select files first.')
      return
    }

    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('beginFile', selectedBeginFile);
    formData.append('endFile', selectedEndFile);

    try {
      const response = await fetch(`/api/add/project/${text}/`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
        },
      })

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP status ${response.status}`);
      }

      setUploadStatus('Upload successfully')
      getData()
    } catch (error) {
      setUploadStatus('Upload error!!')
    }
  }

  React.useEffect(() => {
    if (selectedImg == '') {
      return
    }

    const imgBegin = new Image();
    imgBegin.src = `media/projs/${selectedImg}/img_begin.jpg`
    imgBegin.onload = () => {
      setImgDim({width: imgBegin.naturalWidth, height: imgBegin.naturalHeight})
    }

    const imgEnd = new Image();
    imgEnd.src = `media/projs/${selectedImg}/img_end.jpg`
    imgEnd.onload = () => {
      setImgDim({width: imgEnd.naturalWidth, height: imgEnd.naturalHeight})
    }

    setResultReady(true);
  }, [selectedImg]);

  React.useEffect(() => {
    getData();
    setResultReady(true);
  }, []);

  const getData = async () => {
    const url = `/api/list/project/`
    try {
      const response = await fetch(url);
      if (response.statusText === 'OK') {
        const data = await response.json();
        setProjList(data.results.map((x, idx) => {
          return {
            "img": x,
            "id": idx
          }
        }));
        setSelectedIdx(0)
        setSelectedImg((data.results.length > 0) ? data.results[0] : '' )
      } else {
        throw new Error('Request failed')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDropDownChange = (e) => {
    setResultReady(false);
    setSelectedIdx(e.target.value);
    setSelectedImg(projList.filter(x=>x.id == e.target.value)[0].img);
  }
  
  return (
    <Box sx={{ display: 'flex' }}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>Image Uploader</h2>
            <table>
              <thead>
                <tr>
                  <td>Begin</td>
                  <td>End</td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input type="file" accept='image/*' onChange={handleBeginFileChange}/>
                  </td>
                  <td>
                    <input type="file" accept='image/*' onChange={handleEndFileChange}/>
                  </td>
                  <td>
                    <TextField
                      label="Project Name"
                      variant="outlined"
                      value={text}
                      onChange={handleTextChange}
                    />
                    <Button variant="contained" onClick={handleUpload} disabled={!selectedBeginFile || !selectedEndFile || text == ''}>
                      Upload Images
                    </Button>
                    {
                      uploadStatus && <p>{uploadStatus}</p>
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Select
                labelId="img-select-label"
                id="img-select"
                value={selectedIdx}
                label="selectOption"
                onChange={handleDropDownChange}
              >
                {
                  projList.map(x => (
                    <MenuItem key={`menu-${x.id}`} value={x.id}>{x.img}</MenuItem>
                  ))
                }
              </Select>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <td>Begin</td>
                      <td>End</td>
                      <td>Result Video</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {
                          isResultReady && (
                            <img 
                              src={`media/projs/${selectedImg}/img_begin.jpg`} 
                              width={imgDim.width} 
                              height={imgDim.height}
                            />
                          )
                        }
                      </td>
                      <td>
                        {
                          isResultReady && (
                            <img 
                              src={`media/projs/${selectedImg}/img_end.jpg`} 
                              width={imgDim.width} 
                              height={imgDim.height}
                            />
                          )
                        }
                      </td>
                      <td>
                        {
                          isResultReady && (
                            <video controls autoplay>
                              <source src={`media/projs/${selectedImg}/interpolated.mp4`} type="video/mp4" />
                            </video>
                          )
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
