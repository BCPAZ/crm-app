const translateFileType = (type) => {
  switch (type){
    case 'drawings' :
      return <span>Çetryoj</span> 
      case 'register' :
      return <span>Reyestr</span> 
      case 'temporary' :
      return <span>Müvəqqəti</span> 
  }
}

export default translateFileType;