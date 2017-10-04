$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < 10; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < 10; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    for(var i = 0; i < 10; i++)
    {
      for(var j = 0; j < 10; j++)
      {
        $('td[data-r=' + i + '][data-c=' + j +']').removeClass('ship').addClass('water');
      }
    }
    
    var battlegroundArray = [10[10]];
    for(var i = 0; i < 10; i++)
    {
      for(var j = 0; j < 10; j++)
      {
        battlegroundArray[i,j] = 0;
      }
    }

    var ships = [];
    
    var carrier = {name: "carrier", length: 5, placed: false};
    var battleship = {name: "battleship", length: 4, placed: false};
    var cruiser = {name: "cruiser", length:3, placed: false};
    var submarine = {name: "submarine", length:3, placed: false};
    var destroyer = {name: "destroyer", length:2, placed: false};

    ships.push(carrier);
    ships.push(battleship);
    ships.push(cruiser);
    ships.push(submarine);
    ships.push(destroyer);

    while(carrier.placed == false || battleship.placed == false || cruiser.placed == false || submarine.place == false || destroyer.placed == false)
    {
      for(var i = 0; i < 5; i++)
      {
        if(ships[i].placed == false)
        {
          var str = JSON.stringify(ships[i]);
          var environmentalInfo = randomPlacing(ships[i],battlegroundArray);
          battlegroundArray = environmentalInfo.playingField;
          var str = JSON.stringify(battlegroundArray);
          
          if(environmentalInfo.isPlaced)
          {
            ships[i].placed = true;
          }
        }
      }
    }
  });
});


function randomPlacing(ship,battlegroundArray)
{
  var environmentalInfo = {playingField: battlegroundArray, isPlaced: false};
  var upper = 9;
  var lower = 0;
  var x = Math.floor(Math.random() *(upper - lower) + lower);
  var y = Math.floor(Math.random() *(upper - lower) + lower);
  
  var direction = Math.floor(Math.random() * (4 - 1) + 1);
  var vertical = true;

  frontSide = {xCor: x, yCor: y};

  if(direction == 1 || direction == 3)
  {
    frontSide.xCor = x + ship.length;
    frontSide.yCor = y;
    vertical = false;
    if(frontSide.xCor > 9 || frontSide.xCor < 0)
    {
      return environmentalInfo;
    }
    
  }else
  {
    frontSide.yCor = y+ship.length;
    frontSide.xCor = x;
    if(frontSide.yCor > 9 || frontSide.yCor < 0)
    {
      return environmentalInfo;
    }
  }

  for(var i = x-1; i < frontSide.xCor+1; i++)
  {
    for(var j = y-1; j < frontSide.yCor+1; j++)
    {
      if(battlegroundArray[i,j] == 1)
      {
        return environmentalInfo;
      }
    }
  }

  for(var i = x; i < frontSide.xCor; i++)
  {
    for(var j = y; j < frontSide.yCor; j++)
    {
      battlegroundArray[i,j] = 1;
    }
  }

  for(var i = 0; i < ship.length; i++)
  {
    if(ship.vertical)
    {
      $('td[data-r=' + x + '][data-c=' + y +']').removeClass('water').addClass('ship');
      y++;
    }else
    {
      $('td[data-r=' + x + '][data-c=' + y +']').removeClass('water').addClass('ship');
      x++;
    }
  }
  environmentalInfo.playingField = battlegroundArray;
  environmentalInfo.isPlaced = true;
  return environmentalInfo;
}
