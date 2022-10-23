export const initialState = {
    name: "",
    description: "",
    positionDescription: "",
    technologies: [],
    startDate: null,
    endDate: null,
    logo: {
        original_url: "",
        resized_url: "",
        original_size: {
            width: 0,
            height: 0,
        },
        asset_id: "",
    },
    renderLogo: null,
    input: null
};

export const actions = {
    setName: "SET_NAME",
    setDescription: "SET_DESCRIPTION",
    setPositionDescription:
        "SET_POSITION_DESCRIPTION",
    setTechnologies: "SET_TECHNOLOGIES",
    toggleTechnology: "TOGGLE_TECHNOLOGY",
    setStartDate: "SET_START_DATE",
    setEndDate: "SET_END_DATE",
    setLogo: "SET_LOGO",
    setRenderLogo: "SET_RENDER_LOGO",
    setInput: "SET_INPUT"
};


const reducer = (state, data) => {
    switch (data.type) {
        case actions.setName: {
            return { ...state, name: data.payload };
        }
        case actions.setDescription: {
            return { ...state, description: data.payload };
        }
        case actions.setPositionDescription: {
            return { ...state, positionDescription: data.payload };
        }
        case actions.setTechnologies: {
            return { ...state, technologies: data.payload };
        }
        case actions.toggleTechnology: {
            const result = [...state.technologies, data.payload];
            return {
                ...state,
                technologies: result.filter(
                    (elem) => result.indexOf(elem) === result.lastIndexOf(elem)
                ),
            };
        }
        case actions.setStartDate: {
            return { ...state, startDate: data.payload };
        }
        case actions.setEndDate: {
            return { ...state, endDate: data.payload };
        }
        case actions.setLogo: {
            return { ...state, logo: data.payload };
        }
        case actions.setRenderLogo: {
            return { ...state, renderLogo: data.payload };
        }
        case actions.setInput: {
            return { ...state, input: data.payload }
        }
        default: {
            return state;
        }
    }
};

export default reducer;