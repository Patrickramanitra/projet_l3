import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/styles.css';
import { Modal, Button, Form, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';

//import { useNavigate } from 'react-router-dom';


const Facts = () => {
  //const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAjoutModal, setShowAjoutModal] = useState(false);
  const [showModifierModal, setShowModifierModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [produitEnCours, setProduitEnCours] = useState({
    numProduit: '',
    design: '',
    prix: '',
    quantite: ''
  });
  const [nouveauProduit, setNouveauProduit] = useState({
    numProduit: '',
    design: '',
    prix: '',
    quantite: ''
  });
  

  useEffect(() => {
    fetchProduits();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);


  const fetchProduits = () => {
    axios.get("http://localhost:3001/")
      .then(response => {
        setProduits(response.data.listeDonnee);
        // Vous devez avoir ces fonctions définies quelque part
        // setTotalMontant(response.data.donneeBasTab.montantTotal);
        // setPrixMin(response.data.donneeBasTab.prixMin);
        // setPrixMax(response.data.donneeBasTab.prixMax);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleAjouterProduit = () => {
    axios.post('http://localhost:3001/addProduits', produitEnCours)
      .then(response => {
        console.log(response.data.message);
        fetchProduits();
        setShowAjoutModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  const handleModifierProduit = (produit) => {
    setProduitEnCours(produit);
    setShowModifierModal(true);
};

 
  const handleModifierProduits = () => {
    axios.put(`http://localhost:3001/modifierProduits/${produitEnCours.numProduit}`, produitEnCours)
      .then(response => {
        console.log(response.data.message);
        fetchProduits();
        setShowModifierModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  };



  const handleSupprimerProduits = (numProduit) => {
    axios.delete(`http://localhost:3001/deleteProduits/${numProduit}`)
      .then(response => {
        console.log(response.data.message);
        fetchProduits();
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduitEnCours({ ...produitEnCours, [name]: value });
  };
  
  const handleNumProduitChange = (e) => {
    const { value } = e.target;
    setProduitEnCours({ ...produitEnCours, numProduit: value });
  };

  const handleDesignChange = (e) => {
    const { value } = e.target;
    setProduitEnCours({ ...produitEnCours, design: value });
  };

  const handlePrixChange = (e) => {
    const { value } = e.target;
    // Ajoutez ici votre validation de prix si nécessaire
    setProduitEnCours({ ...produitEnCours, prix: value });
  };

  const handleQuantiteChange = (e) => {
    const { value } = e.target;
    setProduitEnCours({ ...produitEnCours, quantite: value });
  };

  const afficherListeProduit = () => {
    axios.get("http://localhost:3001/")
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="wrapper">
      <div id="content">
        <h1>Liste des Produits </h1><br/>
        <div className="ajout-produit">
          <button className="btn btn-primary" onClick={() => setShowAjoutModal(true)}><FontAwesomeIcon icon={faCheck}  style={{ fontSize: '20px', marginRight: '20px' }} /> Ajouter </button>
        </div>
        <br/>
  
        <Table striped hover>
          <thead>
            <tr>
              <th>NumProduits</th>
              <th>Désignation</th>
              <th>Prix (Ar)</th>
              <th>Quantité</th>
              <th>Montant </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {produits.map(produit => (
              <tr key={produit.numProduit}>
                <td>{produit.numProduit}</td>
                <td>{produit.design}</td>
                <td>{produit.prix}</td>
                <td>{produit.quantite}</td>
                <td>{produit.montant}</td>
                <td>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => handleModifierProduits(produit)}>Modifier</button>
                  <button type="button" className="btn btn-danger btn-sm" onClick={() => handleSupprimerProduits(produit.numProduit)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

       {/* Modal */}
       <Modal show={showModifierModal} onHide={() => setShowModifierModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier un Produit </Modal.Title> 
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group className="mb-3">
                <Form.Label>NumProduits</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Numero du Produit "
                  value={produitEnCours.numProduit}
                  onChange={handleNumProduitChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Désignation</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Désignation" 
                value={produitEnCours.design} 
                onChange={handleDesignChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prix</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Prix"
                value={produitEnCours.prix} 
                onChange={handlePrixChange} 
                 />
                   {showAlert && (
                    <Alert variant="danger">
                      Le Prix doit contenir que des  chiffres.
                    </Alert>
                  )}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Quantité</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Quantité" 
                value={produitEnCours.quantite} 
                onChange={handleQuantiteChange}
                />
              </Form.Group>

              <Button variant="primary" type="button" onClick={handleModifierProduit}>
                Modifier
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal show={showAjoutModal} onHide={() => setShowAjoutModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter un Produit </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
          <Form.Group className="mb-3">
            <Form.Label>NumProduit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Numéro du Produit "
              value={produitEnCours.numProduit}
              onChange={handleNumProduitChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
                <Form.Label>Désignation</Form.Label>
                <Form.Control type="text" 
                placeholder="Désignation" 
                value={produitEnCours.design} 
                onChange={handleDesignChange}
                />
          </Form.Group>
         
          <Form.Group className="mb-3">
                <Form.Label> Prix </Form.Label>
                <Form.Control type="text" 
                placeholder="Prix du Produit " 
                value={produitEnCours.prix} 
                onChange={handlePrixChange} 
                />
                 {showAlert && (
                    <Alert variant="danger">
                      Le prix  doit contenir que des  chiffres.
                    </Alert>
                  )}
          </Form.Group>
          <Form.Group className="mb-3">
                <Form.Label>Quantité</Form.Label>
                <Form.Control type="Quantité " 
                placeholder="Quantité" 
                value={produitEnCours.quantite} 
                onChange={handleQuantiteChange}  
                />
          </Form.Group>
              <Button variant="primary" type="button" onClick={handleAjouterProduit}>
                Ajouter
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

      </div>
      {isLoading && (
        <div className="loader">
          <div className="loader-circle"></div>
        </div>
      )}
    </div>
  );
};

export default Facts;