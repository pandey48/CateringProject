import { useEffect, useState } from "react";
import { Trash2, Search } from "lucide-react";
import API_URL from "../config";

export default function Menu() {
  const [menus, setMenus] = useState([]);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    dishName: "",
    category: "",
    price: "",
  });

  const [ingredients, setIngredients] = useState([
    {
      category: "",
      name: "",
      quantity: "",
      unit: "Kg",
    },
  ]);

  // Fetch Menu
  const fetchMenus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/menu`);
      const data = await res.json();
      setMenus(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  // Dish Form Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Ingredient Change
  const handleIngredientChange = (index, e) => {
    const values = [...ingredients];
    values[index][e.target.name] = e.target.value;
    setIngredients(values);
  };

  // Add Ingredient Row
  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      {
        category: "",
        name: "",
        quantity: "",
        unit: "Kg",
      },
    ]);
  };

  // Save Menu
  const addMenu = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/api/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        ingredients,
      }),
    });

    if (res.ok) {
      alert("Menu Added Successfully");

      setForm({
        dishName: "",
        category: "",
        price: "",
      });

      setIngredients([
        {
          category: "",
          name: "",
          quantity: "",
          unit: "Kg",
        },
      ]);

      fetchMenus();
    }
  };

  // Delete Menu
  const deleteMenu = async (id) => {
    if (!window.confirm("Delete this menu?")) return;

    await fetch(`${API_URL}/api/menu/${id}`, {
      method: "DELETE",
    });

    fetchMenus();
  };

  const filteredMenu = menus.filter((item) =>
    item.dishName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-cyan-200 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">
        Menu Management
      </h1>

      <form
        onSubmit={addMenu}
        className="bg-amber-200 rounded-xl shadow p-6 mb-8"
      >

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="text"
            name="dishName"
            placeholder="Dish Name"
            value={form.dishName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Dish Category"
            value={form.category}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

        </div>

        <div className="mt-8">

          <h2 className="text-xl font-bold mb-4">
            Ingredients
          </h2>

          {ingredients.map((ingredient, index) => (

            <div
              key={index}
              className="grid md:grid-cols-4 gap-4 mb-4"
            >

              <select
                name="category"
                value={ingredient.category}
                onChange={(e) =>
                  handleIngredientChange(index, e)
                }
                className="border rounded-lg p-3"
              >
                <option value="">Select Category</option>
                <option value="Vegetable">🥬 सब्जी</option>
                <option value="Grocery">🛒 किराना</option>
                <option value="Dairy">🥛 डेयरी</option>
                <option value="Spices">🌶️ मसाले</option>
                <option value="Dry Fruits">🥜 ड्राई फ्रूट</option>
                <option value="Other">📦 अन्य</option>
              </select>

              <input
                type="text"
                name="name"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, e)
                }
                className="border rounded-lg p-3"
              />

              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleIngredientChange(index, e)
                }
                className="border rounded-lg p-3"
              />

              <select
                name="unit"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, e)
                }
                className="border rounded-lg p-3"
              >
                <option>Kg</option>
                <option>Gram</option>
                <option>Liter</option>
                <option>Piece</option>
              </select>

            </div>

          ))}

          <button
            type="button"
            onClick={addIngredient}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            + Add Ingredient
          </button>

        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mt-8"
        >
          Add Menu
        </button>

      </form>

      <div className="flex items-center gap-3 mb-6">

        <Search />

        <input
          type="text"
          placeholder="Search Dish..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-3 rounded-lg w-80"
        />

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-900 text-white">

            <tr>
              <th className="p-4">Dish</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredMenu.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-100"
              >

                <td className="p-4">
                  {item.dishName}
                </td>

                <td>{item.category}</td>

                <td>₹ {item.price}</td>

                <td>

                  <button
                    onClick={() =>
                      deleteMenu(item._id)
                    }
                    className="text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}