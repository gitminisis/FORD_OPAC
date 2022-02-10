import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
class HelpModal extends React.Component {
  render() {
    return (
      <Modal
        show={this.props.open}
        onHide={this.props.close}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title as="h3"> General search help </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>The online collections catalog has several search options.</p>
          <ul>
            <li>
              For a simple keyword search, enter your search term into the main
              search field and press the search icon or hit enter.
            </li>

            <li>
              Capital letters and punctuation are not necessary. For personal
              names, "last name first" order is not necessary.
            </li>

            <li> Use the * symbol to truncate a word in your search.</li>

            <li>
              Click on the "Go" search button to execute the search. Click on
              the "Blue down arrow" button to expand to the advanced search
              options.
            </li>
          </ul>
          <hr />
          <h3>Simple search</h3>
          <p>
            The simple search option allows users to conduct a keyword-type
            search in all of the following fields at once:
          </p>
          <ul>
            <li>Title</li> <li>Author</li> <li>Date</li>
            <li>Physical description</li> <li>Scope</li> <li>Subject</li>
            <li>Reference #</li> <li>Collection</li>
          </ul>
          <hr />
          <h3>Advanced search</h3>
          <p>
            {" "}
            The advanced search allows users to search in any combination of the
            following fields:
          </p>{" "}
          <ul>
            <li>Title</li> <li>Author</li> <li>Date</li> <li>Collection</li>
          </ul>
          <p>
            {" "}
            As a default, typing in multiple boxes yields results using the AND
            Boolean operator. Each field has a drop down menu to the left where
            the Boolean operator (AND, OR, NOT) may be selected. A Boolean
            search combines terms with the operators AND, OR, or NOT.
          </p>{" "}
          <ul>
            {" "}
            <li>AND searches for all terms in the results.</li>
            <li>
              {" "}
              OR searches for either or any of the search terms in the results.
            </li>
            <li>
              {" "}
              NOT excludes records which contain the term(s) entered in this
              field.
            </li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default HelpModal;
