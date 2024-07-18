import { TouchableOpacity, View  } from "react-native";
import { Icon, Switch, Text } from "react-native-paper";

const ToggleSwitch = ({ icon, label, value, onToggle }: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <Icon name={icon} size={24} color="#333" style={{ marginRight: 10 }} /> */}
          <Text>{label}</Text>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onToggle}
          value={value}
        />
      </View>
    );
  };

export default ToggleSwitch;