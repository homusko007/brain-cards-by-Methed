const API_URL = 'https://oasis-dandelion-evergreen.glitch.me';

export const fetchCategories = async () => {
    try {
        const resp = await fetch(`${API_URL}/api/category`);

        if (resp.status === 200 || resp.status === 201) {
            const categories = await resp.json();
            return categories;
        } else {
           const error = await resp.json();
           throw error; 
        }
    } catch (error) {
return { error };
    }
};

export const fetchCards = async (id) => {
    try {
        const resp = await fetch(`${API_URL}/api/category/${id}`);

        if (resp.status === 200 || resp.status === 201) {
            const cards = await resp.json();
            return cards;
        } else {
           const error = await resp.json();
           throw error; 
        }
    } catch (error) {
return { error };
    }
};

export const fetchCreateCategory = async (data) => {
    try {
        const resp = await fetch(`${API_URL}/api/category/`, {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (resp.status === 200 || resp.status === 201) {
            const  categories = await resp.json();
            return categories;
        } else {
           const error = await resp.json();
           throw error; 
        }
    } catch (error) {
return { error };
    }
};

export const fetchEditCategory = async (id, data) => {
    try {
        const resp = await fetch(`${API_URL}/api/category/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });

        if (resp.status === 200 || resp.status === 201) {
            const categories = await resp.json();
            return categories;
        } else {
           const error = await resp.json();
           throw error; 
        }
    } catch (error) {
return { error };
    }
};

export const fetchDeleteCategory = async (id) => {
    try {
        const resp = await fetch(`${API_URL}/api/category/${id}`, {
            method: 'DELETE',
        });

        if (resp.status === 200 || resp.status === 201) {
            const result = await resp.json();
            return result;
        } else {
           const error = await resp.json();
           throw error; 
        }
    } catch (error) {
return { error };
    }
};
