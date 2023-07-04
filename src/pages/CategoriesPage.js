import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState, useEffect } from "react";
import { Container, Form, Stack, Row, Col, Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { postNotes, getCategories, postCategories } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { sweetAlertError, sweetAlertSuccess } from "../utils/sweet-alert";
import { extractKeywords, extractSentences } from "../utils/textrank";
import CreatableReactSelect from 'react-select/creatable';

const AddNote = () => {
  const navigate = useNavigate();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [title, setTitle] = useState("");
  const [main, setMain] = useState("");
  const [category, setCategory] = useState("none");
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await getCategories();
      setCategories(data);
    }
    fetchCategories();
  }, []);

const createCategoryOption = (label) => {
  if (label) {
    return {
      label,
      value: label.toLowerCase().replace(/\W/g, ""),
    };
  }
  return null;
};

const handleCategoryChange = (selectedOption) => {
  setCategory(selectedOption ? selectedOption.value : null);
};

const handleCreateCategory = async (inputValue) => {
  const newCategory = createCategoryOption(inputValue);

  const { error, message, data } = await postCategories({ name: newCategory.value });

  if (!error) {
    const updatedCategories = [...categories, data]; // Tambahkan data kategori baru ke state categories
    setCategories(updatedCategories);
    setCategory(createCategoryOption(data.name));
    sweetAlertSuccess("New category has been created", "Success!");
  } else {
    sweetAlertError(message);
  }
};

  async function onSaveNoteHandler(event) {
    event.preventDefault();

    const cueArray = extractKeywords(main, 5, 20);
    const cueList = cueArray.map((cue) => `- ${cue}`).join('\n');

    const sentences = main.split('.');
    const summaryArray = extractSentences(sentences, 3, 5);
    const summaryList = summaryArray.map((summary) => `- ${summary}`).join('\n');

  const { error, message } = await postNotes({
    title,
    main,
    cue: cueList,
    summary: summaryList,
    categoryId: category,
  });

    if (!error) {
      navigate('/');
      sweetAlertSuccess("Your note is added", "Success!");
    } else {
      sweetAlertError(message);
    }
  } 

  return (
    <Container className='my-4'>
      <section>
        <div className="select-add">
          <h1>CATEGORY</h1>
            <CreatableReactSelect
              isClearable
              options={categories.map((category) => createCategoryOption(category.name))}
              value={categories.filter(category => category.value === category)[0]}
              onChange={handleCategoryChange}
              onCreateOption={handleCreateCategory}
            />  
        </div>
        <Form onSubmit={onSaveNoteHandler}>
          <Stack gap={4}>
            <Row>
              <Col>
                <Form.Group controlId="titlenote">
                  <Form.Label>Title</Form.Label>
                  <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId=''></Form.Group>
              </Col>
            </Row>
          </Stack>
          <div className="note-columns" id="note-columns">
            <textarea
              id="note-columns-note"
              name="columns-note"
              className="input-notee"
              rows="15"
              cols="50"
              value={main}
              onChange={(e) => setMain(e.target.value)}
            />
            <label htmlFor="columns-note" className="input-label-note">Notes</label>
          </div>
          <div className="button-sec">
            <div>
              <Button variant="primary" className="note-button" type="submit">Save Note</Button>
              <Button variant="primary" className="note-button" onClick={handlePrint}>Print Note</Button>
            </div>
          </div>
        </Form>
      </section>
    </Container>
  );
};

export default AddNote;