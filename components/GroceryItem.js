import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/groceryItem.module.css";
import Input from "./Input";
const GroceryItem = () => {
  /**backend url */
  const common_url = "http://localhost:3003";

  const [values, setValues] = useState({
    itemName: "",
    itemQuantity: "",
    items: [],
  });

  const { itemName, itemQuantity, items } = values;

  /**This function for get itmes */
  const fetchItems = async () => {
    try {
      const response = await axios.get(`${common_url}/getItems`);
      setValues({ ...values, items: response.data });
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    // Fetch items when the component mounts
    fetchItems();
  }, []);
  /**This functions for add item*/
  const addItem = async () => {
    try {
      await axios.post(`${common_url}/addItem`, {
        name: itemName,
        quantity: itemQuantity,
      });
      // Clear input fields
      setValues({ ...values, itemName: "", itemQuantity: "" });
      // Fetch items again to update the list
      fetchItems();
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  /**Onchange handller */
  const onChangeHandller = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className={styles.mainDiv}>
      <div className={styles.addItemDiv}>
        <div>
          <h1>Grocery Inventory</h1>
          <Input
            label={"Item:"}
            name={"itemName"}
            onChangeHandller={onChangeHandller}
            value={itemName}
            placeholder={"Enter your item name"}
          />
          <Input
            type="number"
            label={"Quantity:"}
            name="itemQuantity"
            placeholder={"Enter your item quantity"}
            value={itemQuantity}
            onChangeHandller={onChangeHandller}
          />
          <button className={styles.buttonStyle} onClick={addItem}>
            Add Item
          </button>
        </div>
      </div>
      <div className={styles.tableMainDiv}>
        <h2 className={styles.headingList}>List of items:</h2>
        <table
          style={{
            borderCollapse: "collapse",
            width: "50%",
            textAlign: "left",
            margin: "20px 0",
          }}
        >
          <thead>
            <tr
              style={{
                border: "1px solid #ddd",
                padding: "8px",
                background: "#f2f2f2",
              }}
            >
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Items
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {items?.map((item, index) => (
              <tr
                key={index}
                style={{ border: "1px solid #ddd", padding: "8px" }}
              >
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {" "}
                  {item.name}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroceryItem;
