class Components
{
    to_replace
    element_classes

    constructor(to_replace,element_classes)
    {
        this.to_replace = to_replace
        this.element_classes = element_classes

        this.create_component()
    }

    create_component(){}
}

// searchbar component
class SearchBar extends Components
{
    create_component()
    {
        console.log('je veux créer le composant searchbar')
    }
}

class LogoutButton extends Components
{
    create_component()
    {
        console.log('je veux créer le composant logout button')
    }
}

// list of components and their associated classes
let components_map = new Map()

components_map
    .set('searchbar',SearchBar)
    .set('logout-btn',LogoutButton)

// create all components in the current page
export default function create_components()
{
    document.querySelectorAll('.component').forEach(component_element => {

        const component_element_classes = Array.from(component_element.classList)

        for(const component_element_class of component_element_classes)
        {
            if(components_map.has(component_element_class) )
            {
                new (components_map.get(component_element_class))(component_element,component_element_classes)

                break
            }
        }
    })
}















