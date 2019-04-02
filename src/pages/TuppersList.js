import React, { Component } from 'react';
import tupperService from '../lib/tupper-service';
import TupperCard from '../components/TupperCard';
import SearchBar from '../components/SearchBar';
import { withAuth } from '../providers/AuthProvider';

class TuppersList extends Component {

  state={
    tuppers: [],
    filteredList: []
  }

  componentDidMount() {
    this.getTupperList();
  }
  
  getTupperList = () => {
    tupperService.getAll()
    .then(tuppers => {
      this.setState({
        tuppers,
        filteredList: tuppers
      })
    })
    .catch(err => console.log(err));
  }

  renderAll = () => {
    const { tuppers } = this.state;
    const { _id } = this.props.user;
    if(tuppers.length > 0) {
      return (tuppers.map((tupper) => {
        if (tupper.available && tupper.creator !== _id){
          return (
            <TupperCard
              key={tupper._id}
              tupper={tupper}
            />
          ) 
        } else { return null }
      }))
    } else { return <p>No tuppers yet</p> }
  }

  handleSearch = (tupperName) => {
    const { tuppers, } = this.state;
    const filteredList = tuppers.filter((e) => e.name.toLowerCase().includes(tupperName.toLowerCase()));
    this.setState({
      filteredList
    })
  } 

  renderSearch = () => {
    const { filteredList } = this.state;
    const { _id } = this.props.user;
    if(filteredList.length > 0) {
      return (
        <>
          <SearchBar 
          change={this.handleSearch}
          />
          {(filteredList.map((tupper) => {
            if (tupper.available && tupper.creator !== _id){
              return (
                <>
                  <TupperCard
                    key={tupper._id}
                    tupper={tupper}
                  />
                </>
              ) 
            } else { return null }
          }))}
      </>
      )
    } else { return <p>No tuppers founded</p> }
  }

  renderVegetarian = () => {
    const { tuppers } = this.state;
    const { _id } = this.props.user;
    const vegetarianTuppers = tuppers.filter(tupper => (
      tupper.category.includes("vegetarian")
    ))
    if(vegetarianTuppers.length > 0) {
      return (vegetarianTuppers.map((tupper) => {
        if (tupper.available && tupper.creator !== _id){
          return (
            <TupperCard
              key={tupper._id}
              tupper={tupper}
            />
          ) 
        } else { return null }
      })) 
    } else { return <p>No vegetarian tuppers yet</p> }
  }

  renderVegan= () => {
    const { tuppers } = this.state;
    const { _id } = this.props.user;
    const veganTuppers = tuppers.filter(tupper => (
      tupper.category.includes("vegan")
    ))
    if(veganTuppers.length > 0) {
      return (veganTuppers.map((tupper) => {
        if (tupper.available && tupper.creator !== _id){
          return (
            <TupperCard
              key={tupper._id}
              tupper={tupper}
            />
          ) 
        } else { return null }
      }))
    } else { return <p>No vegan tuppers yet</p> }
  }

  renderMeat= () => {
    const { tuppers } = this.state;
    const { _id } = this.props.user;
    const meatTuppers = tuppers.filter(tupper => (
      tupper.category.includes("meat")
    ))
    if(meatTuppers.length > 0) {
      return (meatTuppers.map((tupper) => {
        if (tupper.available && tupper.creator !== _id){
          return (
            <TupperCard
              key={tupper._id}
              tupper={tupper}
            />
          ) 
        } else { return null }
      }))
    } else { return <p>No meat tuppers yet</p> }
  }

  renderPasta= () => {
    const { tuppers } = this.state;
    const { _id } = this.props.user;
    const pastaTuppers = tuppers.filter(tupper => (
      tupper.category.includes("pasta")
    ))
    if(pastaTuppers.length > 0) {
      return (pastaTuppers.map((tupper) => {
        if (tupper.available && tupper.creator !== _id){
          return (
            <TupperCard
              key={tupper._id}
              tupper={tupper}
            />
          ) 
        } else { return null }
      }))
    } else { return <p>No pasta tuppers yet</p> }
  }

  renderGlutenfree= () => {
    const { tuppers } = this.state;
    const { _id } = this.props.user;
    const glutenfreeTuppers = tuppers.filter(tupper => (
      tupper.category.includes("gluten-free")
    ))
    if(glutenfreeTuppers.length > 0) {
      return (glutenfreeTuppers.map((tupper) => {
        if (tupper.available && tupper.creator !== _id){
          return (
            <TupperCard
              key={tupper._id}
              tupper={tupper}
            />
          ) 
        } else { return null }
      }))
    } else { return <p>No gluten-free tuppers yet</p> }    
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
          <div className="tuppers-page search">
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

export default withAuth(TuppersList);

