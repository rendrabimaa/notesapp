import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef } from "react";
import { Container, Form, Stack, Row, Col, Button } from "react-bootstrap"
import { useReactToPrint } from "react-to-print";
import { postNotes } from "../utils/api";
import useInput from "../hooks/useInput";
import Select from 'react-select';
import { getCategories } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { sweetAlertError, sweetAlertSuccess } from "../utils/sweet-alert";
import { extractKeywords, extractSentences } from "../utils/textrank";

const AddNote = () => {
  const navigate = useNavigate();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [title, handleTitleChange] = useInput("");
  const [main, handleMainChange] = useInput("");
  const [categories, setCategories] = React.useState(null);
  const [category, setCategory] = React.useState("none");

  React.useEffect(() => {
    async function fetchCategories() {
      const { data } = await getCategories();

      setCategories(data);
    }
    fetchCategories();
  }, []);

  const options = [
    { value: 'none', label: 'None' }
  ];

  let printElementSelect = (
    <Select 
      options={options} 
      isDisabled={true}
      isLoading={true}
      className="react-select-container" 
    />
  );

  if (categories !== null) {
    for (let i = 0; i < categories.length; i++) {
      options.push({value: categories[i].id, label: categories[i].name});
    }

    printElementSelect = (
      <Select 
        options={options} 
        value={options.filter(option => option.value === category)[0]} 
        onChange={onSelectChangeHandler}
        isSearchable={false}
        className="react-select-container" 
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: 'gray',
            primary50: '#fff',
            primary: 'black',
          },
        })}
      />
    );
  }

  function onSelectChangeHandler(event) {
    setCategory(event.value);
  }

  async function onSaveNoteHandler(event) {
    event.preventDefault();

    const cueArray = extractKeywords(main, 5, 20); // Ekstraksi 5 hingga 20 kata sebagai keyword
    const cueList = cueArray.map((cue, index) => `- ${cue}`).join('\n');

    const sentences = main.split('.');
    const summaryArray = extractSentences(sentences, 3, 5); // Ekstraksi 3 hingga 5 kalimat sebagai ringkasan
    const summaryList = summaryArray.map((summary, index) => `- ${summary}`).join('\n');

    const { error, message } = await postNotes({
      title,
      main,
      cue: cueList,
      summary: summaryList,
      categoryId: category,
    });

    if (!error) {
      navigate('/');
      return sweetAlertSuccess("Your note is added", "Success!");
    }

    sweetAlertError(message);
  } 

  

  return (
    <Container className='my-4'>
      <section>
        <div className="select-add">
          <h1>CATEGORY </h1>
          {printElementSelect}
        </div>
          <Form onSubmit={onSaveNoteHandler}>
            <Stack gap={4}>
              <Row>
                <Col>
                  <Form.Group controlId="titlenote">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId=''>

                  </Form.Group>
                </Col>
              </Row>
            </Stack>
            <div className="note-columns" id="note-columns">
              <textarea id="note-columns-note" name="columns-note" className="input-notee" rows="15" cols="50" value={main} onChange={handleMainChange} />
              <label htmlFor="columns-note" className="input-label-note">Notes </label>
            </div>
            <div className="button-sec">
              <div>
                <Button variant="primary" className="note-button" type="submit"> Save Note </Button>
                <Button variant="primary" className="note-button" onClick={handlePrint}> Print Note </Button>
              </div>
            </div>
          </Form>
      </section>
    </Container>
  );
};

export default AddNote;