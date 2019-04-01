import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import TupperCard from '../components/TupperCard';
import SearchBar from '../components/SearchBar';

class TuppersList extends Component {

  state={
    tuppers: []
  }

  componentDidMount() {
    this.getTupperList();
  }
  
  getTupperList = () => {
    tupperService.getAll()
    .then(tuppers => {
      this.setState({
        tuppers
      })
    })
    .catch(err => console.log(err));
  }

  renderAll = () => {
    const { tuppers } = this.state;
    return (tuppers.map((tupper) => {
      if (tupper.available){
        return (
          <TupperCard
            key={tupper._id}
            tupper={tupper}
          />
        ) 
      } else {
        return null
      }
    }))
  }

  renderSearch = () => {
    const { tuppers } = this.state;
    return (
      <>
        <SearchBar 
        change={this.handleSearch}
        />
        {(tuppers.map((tupper) => {
          if (tupper.available){
            return (
              <>
                <TupperCard
                  key={tupper._id}
                  tupper={tupper}
                />
              </>
            ) 
          } else {
            return null
          }
        }))}
    </>
    )
  }

  handleSearch = (tupperName) => {
    const { tuppers } = this.state;
    const filteredList = tuppers.filter((e) => e.name.toLowerCase().includes(tupperName.toLowerCase()));
      this.setState({
      tuppers: filteredList
    })
  } 

  renderVegetarian = () => {
    const { tuppers } = this.state;
    const vegetarianTuppers = tuppers.filter(tupper => (
      tupper.category.includes("vegetarian")
    ))
    return (vegetarianTuppers.map((tupper) => {
      if (tupper.available){
        return (
          <TupperCard
            key={tupper._id}
            tupper={tupper}
          />
        ) 
      } else {
        return null
      }
    }))
  }

  renderVegan= () => {
    const { tuppers } = this.state;
    const veganTuppers = tuppers.filter(tupper => (
      tupper.category.includes("vegan")
    ))
    return (veganTuppers.map((tupper) => {
      if (tupper.available){
        return (
          <TupperCard
            key={tupper._id}
            tupper={tupper}
          />
        ) 
      } else {
        return null
      }
    }))
  }

  renderMeat= () => {
    const { tuppers } = this.state;
    const meatTuppers = tuppers.filter(tupper => (
      tupper.category.includes("meat")
    ))
    return (meatTuppers.map((tupper) => {
      if (tupper.available){
        return (
          <TupperCard
            key={tupper._id}
            tupper={tupper}
          />
        ) 
      } else {
        return null
      }
    }))
  }

  renderPasta= () => {
    const { tuppers } = this.state;
    const pastaTuppers = tuppers.filter(tupper => (
      tupper.category.includes("pasta")
    ))
    return (pastaTuppers.map((tupper) => {
      if (tupper.available){
        return (
          <TupperCard
            key={tupper._id}
            tupper={tupper}
          />
        ) 
      } else {
        return null
      }
    }))
  }

  renderGlutenfree= () => {
    const { tuppers } = this.state;
    const glutenfreeTuppers = tuppers.filter(tupper => (
      tupper.category.includes("gluten-free")
    ))
    return (glutenfreeTuppers.map((tupper) => {
      if (tupper.available){
        return (
          <TupperCard
            key={tupper._id}
            tupper={tupper}
          />
        ) 
      } else {
        return null
      }
    }))
  }

  render() {
    const { pathname } = this.props.location;
    switch(pathname){
      case '/tuppers/all':
        return (
          <div className="tuppers-page">
            {this.renderAll()}
          </div>);
      case '/tuppers/search':
        return (
          <div className="tuppers-page">
            {this.renderSearch()}
          </div>);
      case '/tuppers/vegetarian':
        return (
          <div className="tuppers-page">
            {this.renderVegetarian()}
          </div>);
      case '/tuppers/vegan':
        return (
          <div className="tuppers-page">
            {this.renderVegan()}
          </div>);
      case '/tuppers/meat':
        return (
          <div className="tuppers-page">
            {this.renderMeat()}
          </div>);
      case '/tuppers/pasta':
        return (
          <div className="tuppers-page">
            {this.renderPasta()}
          </div>);
      case '/tuppers/gluten-free':
        return (
          <div className="tuppers-page">
            {this.renderGlutenfree()}
          </div>);
      default:
        return null;
    }
  }
}

export default TuppersList;

