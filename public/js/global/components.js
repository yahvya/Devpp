class Components
{
    to_replace
    element_classes
    component_icon_container
    component_icon

    constructor(to_replace,element_classes)
    {
        this.to_replace = to_replace
        this.element_classes = element_classes
    }

    create_component(awesome_classes)
    {
        this.component_icon_container = document.createElement('div')
        this.component_icon = document.createElement('i')

        awesome_classes.forEach(classname => this.component_icon.classList.add(classname) )

        this.component_icon_container.append(this.component_icon)
        this.component_icon_container.classList.add('component-container')

        this.element_classes.forEach(classname => this.component_icon_container.classList.add(classname) )

        this.to_replace.replaceWith(this.component_icon_container)
    }
}

class SearchBox extends Components
{
    show_state = false

    create_component()
    {

    }

    show()
    {

    }

    is_showed()
    {
        return this.show_state
    }
}

// searchbar component
class SearchBar extends Components
{
    searchbox = null

    constructor(to_replace,element_classes)
    {
        super(to_replace,element_classes)

        this.create_component(['fa-solid','fa-magnifying-glass'])

        this.component_icon_container.title = 'Faîtes une recherche sur le site'
        this.component_icon.addEventListener('click',this.show_searchbox)
    }

    show_searchbox()
    {
        if(this.searchbox == null)
        {
            let element_to_replace = document.createElement('span')

            document.body.append(element_to_replace)

            this.searchbox = new SearchBox(element_to_replace,[])
        }

        if(!this.searchbox.is_showed() )
            this.searchbox.show()
    }
}

class LogoutButton extends Components
{
    constructor(to_replace,element_classes)
    {
        super(to_replace,element_classes)

        const logout_event = new CustomEvent('logout')

        this.create_component(['fa-solid','fa-power-off'])

        this.component_icon_container.title = 'Se déconnecter'
        this.component_icon.addEventListener('click',() => {

            window.dispatchEvent(logout_event)
        })
    }
}

class Terminal extends Components
{

}

class ThemeSwitcher extends Components
{
    chooser = null

    constructor(to_replace,element_classes)
    {
        super(to_replace,element_classes)

        this.create_component(['fa-solid','fa-palette'])

        this.component_icon_container.title = 'Choisir le thème'
        this.component_icon.addEventListener('click',this.show_theme_chooser)
    }

    show_theme_chooser()
    {

    }
}

// list of components and their associated classes
let components_map = new Map()

components_map
    .set('searchbar',SearchBar)
    .set('logout-btn',LogoutButton)
    .set('terminal',Terminal)
    .set('theme-switcher',ThemeSwitcher)

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















